'use client';

import * as z from 'zod';

import cn from 'classnames';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SigninSchema } from '@/schemas';
import { signIn } from 'next-auth/react';

import styles from './login.module.scss';
import { SubTitle } from './SubTitle';
import { FcGoogle } from 'react-icons/fc';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { SiNaver } from 'react-icons/si';
import { IoCloseCircleOutline } from 'react-icons/io5';

export const LoginModal = () => {
  const router = useRouter();
  const params = useSearchParams();
  let authError = params.has('code');

  const onClickClose = () => {
    router.back();
  };

  const onClick = (provider: 'google' | 'naver' | 'kakao') => {
    signIn(provider, {
      redirectTo: '/',
    });
  };

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<z.infer<typeof SigninSchema>>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof SigninSchema>) => {
    try {
      await signIn('credentials', {
        ...values,
        redirectTo: '/',
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={cn(`${styles['modal-background']}`)}>
      <div className={styles['modal-card']}>
        <SubTitle title="로그인" />
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
            <label htmlFor="email" className="visually-hidden">
              이메일
            </label>
            <input
              id="email"
              className={styles.input}
              type="text"
              placeholder="이메일"
              {...register('email')}
            />
            {errors?.email && (
              <p className={styles.error}>{errors.email.message}</p>
            )}
            <label htmlFor="password" className="visually-hidden">
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
            {authError && (
              <p className={styles.error}>
                {params.get('code') === 'no_user'
                  ? '존재하지 않는 회원입니다.'
                  : '비밀번호가 틀렸습니다.'}
              </p>
            )}
            <button className={styles['login-button']} disabled={isSubmitting}>
              {isSubmitting ? '로그인 중..' : '로그인'}
            </button>
          </form>
          <div className={styles['link-wrapper']}>
            <Link href="/signup" replace>
              계정이 없어요!
            </Link>
            <Link href="/">비밀번호 분실했어요</Link>
          </div>
        </div>
        <div className={styles['modal-card-footer']}>
          <p>간편하게 로그인 하기</p>
          <div className={styles['button-wrapper']}>
            <button
              className={styles['button-kakao']}
              onClick={() => onClick('kakao')}
            >
              <RiKakaoTalkFill />
            </button>
            <button className={styles['button-naver']}>
              <SiNaver onClick={() => onClick('naver')} />
            </button>
            <button className={styles['button-google']}>
              <FcGoogle onClick={() => onClick('google')} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
