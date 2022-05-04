import { User } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { createRouter } from 'server/createRouter';
import { prisma } from 'server/prisma';
import { z } from 'zod';

export const userRouter = createRouter()
  // get all users
  .query('all', {
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
  })
  // get user by id;
  .query('one', {
    input: z.object({
      id: z.string().nonempty(),
    }),
    async resolve({ input }) {
      const { id } = input;
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });
      return {
        user,
      };
    },
  })
  // update user by id
  .mutation('update', {
    input: z.object({
      id: z.string().nonempty(),
      role: z
        .union([
          z.literal('USER'),
          z.literal('ADMIN'),
          z.literal('CONTENT_CREATOR'),
        ])
        .optional(),
      isActive: z.boolean().optional(),
    }),
    async resolve({ input }) {
      const { id, role, isActive } = input;
      if (!role && !isActive) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'At least one of role or isActive must be provided',
        });
      }

      const user = await prisma.user.update({
        where: {
          id,
        },
        data: {
          role,
          isActive,
        },
      });
      return {
        user,
      };
    },
  });
