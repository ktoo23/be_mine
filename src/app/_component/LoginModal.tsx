'use client';

import cn from 'classnames';

import { FcGoogle } from 'react-icons/fc';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { SiNaver } from 'react-icons/si';
import { IoCloseCircleOutline } from 'react-icons/io5';

import styles from './login.module.scss';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { SubTitle } from './SubTitle';

export const LoginModal = () => {
  const router = useRouter();
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (path !== '/auth/login') {
      setIsOpen(false); // 경로가 '/auth/login'이 아닌 경우 모달 닫기
    } else {
      setIsOpen(true); // 경로가 '/auth/login'인 경우 모달 열기
    }
  }, [path]);

  const onClickClose = () => {
    router.replace('/'); // 경로 변경
    setIsOpen(false); // 모달 닫기
  };

  if (!isOpen) return null; // 모달이 닫히면 렌더링하지 않음

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
          <form>
            <label htmlFor="email" className="visually-hidden">
              이메일
            </label>
            <input
              id="email"
              name="email"
              className={styles.input}
              type="text"
              placeholder="이메일"
            />
            <label htmlFor="password" className="visually-hidden">
              비밀번호
            </label>
            <input
              id="password"
              name="password"
              className={styles.input}
              type="password"
              placeholder="비밀번호"
            />
            <button className={styles['login-button']}>로그인</button>
          </form>
          <div className={styles['link-wrapper']}>
            <Link href="/auth/signup">계정이 없어요!</Link>
            <Link href="/">비밀번호 분실했어요</Link>
          </div>
        </div>
        <div className={styles['modal-card-footer']}>
          <p>간편하게 로그인 하기</p>
          <div className={styles['button-wrapper']}>
            <button className={styles['button-kakao']}>
              <RiKakaoTalkFill />
            </button>
            <button className={styles['button-naver']}>
              <SiNaver />
            </button>
            <button className={styles['button-google']}>
              <FcGoogle />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
