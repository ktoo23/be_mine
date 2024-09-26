'use server';

import * as z from 'zod';

import { SignupSchema } from '@/schemas';

export const signup = async (values: z.infer<typeof SignupSchema>) => {
  const validatedFields = SignupSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: '회원가입 실패' };
  }

  const { name, email, password, image } = validatedFields.data;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
      {
        method: 'post',
        body: JSON.stringify({ name, email, password, image }),
        credentials: 'include',
      },
    );

    console.log(response.status);

    // TODO: 회원가입과 동시에 로그인
  } catch (error) {
    console.error(error);
    return { message: null };
  }
};
