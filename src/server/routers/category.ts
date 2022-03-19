import { prisma } from '../prisma';
import { createRouter } from 'server/createRouter';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

export const categoryRouter = createRouter()
  // create
  .mutation('add', {
    input: z.object({
      id: z.string().uuid().optional(),
      name: z.string().min(1).max(32),
      thumbnail: z.string().min(1),
    }),
    async resolve({ input }) {
      const category = await prisma.category.create({
        data: input,
      });
      return category;
    },
  })
  // read
  .query('all', {
    async resolve() {
      /**
       * For pagination you can have a look at this docs site
       * @link https://trpc.io/docs/useInfiniteQuery
       */

      return prisma.category.findMany({});
    },
  })
  // get by id
  .query('byId', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input }) {
      const { id } = input;
      const category = await prisma.category.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          thumbnail: true,
        },
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
