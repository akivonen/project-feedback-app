import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import type { NextAuthConfig } from 'next-auth';
import { getUserByUsername } from '@/db/queries/users';
import { UserSessionProps } from '@/types';

export const authOptions: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials): Promise<UserSessionProps | null> {
        const username = credentials?.username as string | undefined;
        const password = credentials?.password as string | undefined;
        if (!username || !password) {
          return null;
        }
        const user = await getUserByUsername(username);
        if (user && bcrypt.compareSync(password, user.password)) {
          return {
            id: user.id,
            name: user.username,
            image: user.image,
          };
        }
        return null;
      },
    }),
  ],
  session: { strategy: 'jwt' },
  trustHost: true,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);

export const validateAuthorization = async (
  serverActionName: string,
  userId?: string
): Promise<void | never> => {
  const session = await auth();
  if (!session || (userId && session?.user?.id !== userId)) {
    throw new Error(`Not authorized in ${serverActionName}`);
  }
};
