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
    async resolve() {
      /**
       * For pagination you can have a look at this docs site
       * @link https://trpc.io/docs/useInfiniteQuery
       */

      return prisma.course.findMany({});
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
