import { prisma } from '../prisma';
import { createRouter } from 'server/createRouter';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { Category } from '@prisma/client';

export type ResultItem = Category & {
  _count: {
    Courses: number;
  };
};

type GetAllCategoriesResult = {
  items: ResultItem[];
  count: number;
};

export const categoryRouter = createRouter()
  // create
  .mutation('add', {
    input: z.object({
      id: z.string().uuid().optional(),
      name: z.string().nonempty({
        message: 'Name is required',
      }),
      thumbnail: z.string().nonempty({
        message: 'Thumbnail is required, please upload a file',
      }),
    }),
    async resolve({ input }) {
      return await prisma.category.create({
        data: input,
      });
    },
  })
  // read
  .query('all', {
    async resolve() {
      return await prisma.category.findMany({});
    },
  })
  .query('infinite', {
    input: z.object({
      limit: z.number().min(1).max(100).optional(),
      cursor: z.string().optional(),
      query: z.string().optional(),
    }),
    async resolve({ input }) {
      const limit = input.limit ?? 9;
      const { cursor } = input;
      let items = [];
      const result: GetAllCategoriesResult = {
        items: [],
        count: 0,
      };

      items = input.query
        ? await prisma.category.findMany({
            take: limit + 1,
            where: {
              OR: [
                {
                  name: {
                    contains: input.query,
                    mode: 'insensitive',
                  },
                },
              ],
            },
            include: {
              _count: {
                select: {
                  Courses: true,
                },
              },
            },
            cursor: cursor ? { id: cursor } : undefined,
          })
        : await prisma.category.findMany({
            take: limit + 1,
            cursor: cursor ? { id: cursor } : undefined,
            include: {
              _count: {
                select: {
                  Courses: true,
                },
              },
            },
          });

      result.items = items;
      result.count = input.query
        ? await prisma.category.count({
            where: {
              OR: [
                {
                  name: {
                    contains: input.query,
                    mode: 'insensitive',
                  },
                },
              ],
            },
          })
        : await prisma.category.count();

      let nextCursor: typeof cursor | null = null;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem?.id;
      }

      return {
        result,
        nextCursor,
      };
    },
  })
  // get by id
  .query('one', {
    input: z.object({
      id: z.string().optional(),
    }),
    async resolve({ input }) {
      const { id } = input;
      const category = await prisma.category.findUnique({
        where: { id },
      });
      return { category };
    },
  })
  // update
  .mutation('update', {
    input: z.object({
      id: z.string(),
      data: z.object({
        name: z.string().min(1).max(32),
        thumbnail: z.string().min(1),
      }),
    }),
    async resolve({ input }) {
      const { id, data } = input;
      const category = await prisma.category.update({
        where: { id },
        data,
      });
      if (!category) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No category with id '${id}'`,
        });
      }
      return category;
    },
  })
  // delete
  .mutation('delete', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input }) {
      const { id } = input;
      await prisma.category.delete({ where: { id } });
      return id;
    },
  });
