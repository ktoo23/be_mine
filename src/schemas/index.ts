import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({ message: '이메일 형식이 올바르지 않습니다.' }),
  password: z.string().trim().min(1, { message: '비밀번호를 입력해주세요.' }),
});

export const SignupSchema = z
  .object({
    name: z.string().trim().min(1, { message: '이름을 입력해주세요.' }),
    email: z.string().email({ message: '이메일 형식이 올바르지 않습니다.' }),
    password: z
      .string()
      .regex(
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/,
        '영문+숫자+특수문자(! @ # $ % & * ?) 조합 8~15자리를 입력해주세요.',
      ),
    passwordCheck: z
      .string()
      .trim()
      .min(1, { message: '비밀번호를 다시 입력해주세요.' }),
    image: z.string().optional(),
  })
  .refine((data) => data.password === data.passwordCheck, {
    path: ['passwordCheck'],
    message: '비밀번호가 일치하지 않습니다.',
  });
