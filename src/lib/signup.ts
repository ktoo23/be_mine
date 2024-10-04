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

    if (!response.ok) {
      if (response.status === 403) {
        return { message: '이미 사용 중인 아이디입니다.' };
      }
      // 서버 응답이 200-299가 아닐 때의 처리
      return { message: '회원가입에 실패했습니다. 다시 시도해 주세요.' };
    }
  } catch (error) {
    console.error(error);
    return { message: '잘못된 요청입니다.' };
  }
};
