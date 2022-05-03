import { User } from '@prisma/client';
import { createRouter } from 'server/createRouter';
import { prisma } from 'server/prisma';
import { z } from 'zod';

export const userRouter = createRouter().query('all', {
  input: z.object({
    limit: z.number().min(1).max(100).nullish(),
    cursor: z.string().nullish(),
    query: z.string().nullish(),
  }),
  async resolve({ input }) {
    const limit = input.limit ?? 9;
    const { cursor } = input;

    const query =
      input.query && input.query.length !== 0 ? input.query : undefined;

    const result: {
      items: User[];
      count: number;
    } = {
      items: [],
      count: 0,
    };

    const users = query
      ? await prisma.user.findMany({
          take: limit + 1,
          where: {
            OR: [
              {
                name: {
                  contains: query,
                  mode: 'insensitive',
                },
              },
              {
                email: {
                  contains: query,
                  mode: 'insensitive',
                },
              },
            ],
          },
          cursor: cursor ? { id: cursor } : undefined,
        })
      : await prisma.user.findMany({
          take: limit + 1,
          cursor: cursor ? { id: cursor } : undefined,
        });

    result.items = users;
    result.count = query
      ? await prisma.user.count({
          where: {
            OR: [
              {
                name: {
                  contains: query,
                  mode: 'insensitive',
                },
              },
              {
                email: {
                  contains: query,
                  mode: 'insensitive',
                },
              },
            ],
          },
        })
      : await prisma.user.count();

    let nextCursor: typeof cursor | null = null;
    if (users.length > limit) {
      const nextItem = users.pop();
      nextCursor = nextItem?.id;
    }

    return {
      result,
      nextCursor,
    };
  },
});
