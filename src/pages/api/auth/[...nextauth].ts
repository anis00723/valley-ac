import NextAuth from 'next-auth';
import { AppProviders } from 'next-auth/providers';
import { prisma } from 'server/prisma';

import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

const providers: AppProviders = [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  }),
];

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers,
  debug: process.env.NODE_ENV === 'development',
  callbacks: {
    session({ session, user }) {
      return { ...session, user };
    },
  },
});
