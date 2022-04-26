import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { getSession } from 'next-auth/react';

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createContext = async (
  opts?: trpcNext.CreateNextContextOptions,
) => {
  const { req, res } = opts ?? {};
  // for API-response caching see https://trpc.io/docs/caching
  const session = await getSession({ req });
  console.log('createContext for', session?.user?.name ?? 'Unknown user');
  return {
    req,
    res,
    session,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
