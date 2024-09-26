import NextAuth, { CredentialsSignin } from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import type { Provider } from 'next-auth/providers';
import { SigninSchema } from './schemas';

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
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/signup',
  },
});
