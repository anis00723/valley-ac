import { createRouter } from 'server/createRouter';
import { prisma } from 'server/prisma';
import { z } from 'zod';

export const courseRouter = createRouter()
  // create
  .mutation('add', {
    input: z.object({
      id: z.string().uuid().optional(),
      name: z.string().min(1).max(64),
      price: z.number().positive(),
      thumbnail: z.string().min(1),
      categoryId: z.string().uuid(),
    }),
    async resolve({ input }) {
      const course = await prisma.course.create({
        data: input,
      });
      return course;
    },
  })
  // read
  .query('all', {
    input: z.object({
      categoryIds: z.string().uuid().array().optional(),
      limit: z.number().min(1).max(100).nullish(),
      cursor: z.string().nullish(),
    }),
    async resolve({ input }) {
      const limit = input.limit ?? 9;
      const { cursor } = input;
      let items = [];
      let count = 0;
      if (input.categoryIds?.length !== 0) {
        items = await prisma.course.findMany({
          take: limit + 1,
          where: {
            categoryId: {
              in: input.categoryIds,
            },
          },
          include: {
            category: true,
          },
          cursor: cursor ? { id: cursor } : undefined,
          orderBy: {
            id: 'asc',
          },
        });

        count = await prisma.course.count({
          where: {
            categoryId: {
              in: input.categoryIds,
            },
          },
        });
      } else {
        items = await prisma.course.findMany({
          take: limit + 1,
          include: {
            category: true,
          },

          cursor: cursor ? { id: cursor } : undefined,
          orderBy: {
            id: 'asc',
          },
        });

        count = await prisma.course.count();
      }

      let nextCursor: typeof cursor | null = null;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem?.id;
      }

      let previousCursor: typeof cursor | null = null;
      if (cursor) {
        const previousItem = await prisma.course.findUnique({
          where: {
            id: cursor,
          },
        });
        previousCursor = previousItem?.id;
      }

      return {
        items,
        count,
        nextCursor,
        previousCursor,
      };
    },
  })
  // featured
  .query('featured', {
    async resolve() {
      return prisma.course.findMany({
        where: {
          featured: true,
        },
        include: {
          category: true,
        },
      });
    },
  });
