'use client';

import * as z from 'zod';

import cn from 'classnames';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignupSchema } from '@/schemas';
import { signup } from '@/lib/signup';

import styles from './login.module.scss';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { PageTitle } from './PageTitle';
import { Slide, toast } from 'react-toastify';

export const SignupModal = () => {
  const router = useRouter();
  const [message, setMessage] = useState('');

  const onClickClose = () => {
    router.back();
  };

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordCheck: '',
      image: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof SignupSchema>) => {
    // await new Promise((resolve) => setTimeout(resolve, 2000)); // 가짜 비동기 작업
    const result = await signup(values);

    if (result?.message) {
      setMessage(result.message);
    } else {
      toast.success('회원가입 성공!', {
        transition: Slide,
      });
      router.replace('/login');
    }
  };

  return (
    <div className={cn(`${styles['modal-background']}`)}>
      <div className={styles['modal-card']}>
        <PageTitle title="회원가입" />
        <div className={styles['modal-card-header']}>
          <button
            type="button"
            className={cn(`${styles['button-close']}`, 'lg-only')}
            onClick={onClickClose}
          >
            <IoCloseCircleOutline />
          </button>
        </div>
        <div className={styles['modal-card-content']}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="name" className={styles.label}>
              이름
            </label>
            <input
              id="name"
              className={styles.input}
              type="text"
              placeholder="매미"
              {...register('name')}
            />
            {errors?.name && (
              <p className={styles.error}>{errors.name.message}</p>
            )}
            <label htmlFor="email" className={styles.label}>
              이메일
            </label>
            <input
              id="email"
              className={styles.input}
              type="text"
              placeholder="mami@example.com"
              {...register('email')}
            />
            {errors?.email && (
              <p className={styles.error}>{errors.email.message}</p>
            )}
            <label htmlFor="password" className={styles.label}>
              비밀번호
            </label>
            <input
              id="password"
              className={styles.input}
              type="password"
              placeholder="비밀번호"
              {...register('password')}
            />
            {errors?.password && (
              <p className={styles.error}>{errors.password.message}</p>
            )}
            <label htmlFor="password-check" className={styles.label}>
              비밀번호 확인
            </label>
            <input
              id="password-check"
              className={styles.input}
              type="password"
              placeholder="******"
              {...register('passwordCheck')}
            />
            {errors?.passwordCheck && (
              <p className={styles.error}>{errors.passwordCheck.message}</p>
            )}
            <label
              htmlFor="password-check"
              className={cn(styles.label, styles['label-profile'])}
            >
              프로필
            </label>
            <input
              id="image"
              className={styles['input-profile']}
              type="file"
              accept="image/*"
              {...register('image')}
            />
            <button className={styles['login-button']} disabled={isSubmitting}>
              {isSubmitting ? '제출 중..' : '회원가입'}
            </button>
            {message && <p className={styles.error}>{message}</p>}
          </form>
          <div className={styles['link-wrapper']}>
            <Link href="/auth/login" replace>
              계정 있어요!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
