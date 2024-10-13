import NextAuth, { CredentialsSignin } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import type { Provider } from 'next-auth/providers';
import { SigninSchema } from './schemas';

import google from 'next-auth/providers/google';
import naver from 'next-auth/providers/naver';
import Kakao from 'next-auth/providers/kakao';

const providers: Provider[] = [
  Credentials({
    async authorize(credentials) {
      const validateFields = SigninSchema.safeParse(credentials);

      if (!validateFields.success) {
        return null;
      }

      const { email, password } = validateFields.data;

      const authResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        },
      );

      if (!authResponse.ok) {
        const credentialsSignin = new CredentialsSignin();
        if (authResponse.status === 404) {
          credentialsSignin.code = 'no_user';
        } else if (authResponse.status === 401) {
          credentialsSignin.code = 'wrong_password';
        }
        throw credentialsSignin;
      }

      const user = await authResponse.json();
      console.log('user', user);
      return user;
    },
  }),
  google({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }),
  naver({
    clientId: process.env.NAVER_CLIENT_ID,
    clientSecret: process.env.NAVER_CLIENT_SECRET,
  }),
  Kakao({
    clientId: process.env.KAKAO_CLIENT_ID,
    clientSecret: process.env.KAKAO_CLIENT_SECRET,
  }),
];

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === 'function') {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== 'credentials');

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  session: {
    strategy: 'jwt',
    maxAge: 3600, // 세션이 1시간 동안 유지됨
  },
  callbacks: {
    session({ session }) {
      session.user.id = '341';
      return session;
    },
    async jwt({ token }) {
      return token;
    },
  },
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/signup',
  },
});
