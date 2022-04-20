import { Category, Course, Review } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { createRouter } from 'server/createRouter';
import { prisma } from 'server/prisma';
import { z } from 'zod';

export type ResultItem = Course & {
  reviews: Review[];
  category: Category;
  _count: {
    reviews: number;
    enrolledUsers: number;
  };
  avgRating?: number;
};

type GetAllCoursesResult = {
  items: ResultItem[];
  count: number;
};

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
      return await prisma.course.create({
        data: input,
      });
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
      const result: GetAllCoursesResult = {
        items: [],
        count: 0,
      };

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
            reviews: true,
            _count: {
              select: {
                enrolledUsers: true,
                reviews: true,
              },
            },
          },
          cursor: cursor ? { id: cursor } : undefined,
          orderBy: {
            id: 'asc',
          },
        });

        result.count = await prisma.course.count({
          where: {
            categoryId: {
              in: input.categoryIds,
            },
          },
        });
        result.items = items;
      } else {
        items = await prisma.course.findMany({
          take: limit + 1,
          include: {
            category: true,
            reviews: true,
            _count: {
              select: {
                enrolledUsers: true,
                reviews: true,
              },
            },
          },
          cursor: cursor ? { id: cursor } : undefined,
          orderBy: {
            id: 'asc',
          },
        });

        result.count = await prisma.course.count();
        result.items = items;
      }

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
  // featured
  .query('featured', {
    async resolve() {
      return prisma.course.findMany({
        where: {
          featured: true,
        },
        include: {
          category: true,
          reviews: true,
          _count: {
            select: {
              enrolledUsers: true,
              reviews: true,
            },
          },
        },
      });
    },
  })
  // read one
  .query('one', {
    input: z.object({
      id: z.string().uuid(),
    }),
    async resolve({ input }) {
      const { id } = input;
      const course = await prisma.course.findUnique({
        where: {
          id,
        },
        include: {
          category: true,
          reviews: true,
          _count: {
            select: {
              enrolledUsers: true,
              reviews: true,
            },
          },
        },
      });

      if (!course) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No course with id '${id}'`,
        });
      }
      return course;
    },
  })
  // update
  .mutation('update', {
    input: z.object({
      id: z.string().uuid(),
      name: z.string().min(1).max(64),
      price: z.number().positive(),
      thumbnail: z.string().min(1),
      categoryId: z.string().uuid(),
    }),
    async resolve({ input }) {
      const { id } = input;
      const course = await prisma.course.findUnique({
        where: {
          id,
        },
      });

      if (!course) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No course with id '${id}'`,
        });
      }

      return await prisma.course.update({
        where: {
          id,
        },
        data: input,
      });
    },
  });
