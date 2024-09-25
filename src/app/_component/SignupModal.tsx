'use client';

import cn from 'classnames';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import styles from './login.module.scss';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { SubTitle } from './SubTitle';

export const SignupModal = () => {
  const router = useRouter();
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (path !== '/auth/signup') {
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
        <SubTitle title="회원가입" />
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
            <label htmlFor="name" className={styles.label}>
              이름
            </label>
            <input
              id="name"
              name="name"
              className={styles.input}
              type="text"
              placeholder="매미"
            />
            <label htmlFor="email" className={styles.label}>
              이메일
            </label>
            <input
              id="email"
              name="email"
              className={styles.input}
              type="text"
              placeholder="mami@example.com"
            />
            <label htmlFor="password" className={styles.label}>
              비밀번호
            </label>
            <input
              id="password"
              name="password"
              className={styles.input}
              type="password"
              placeholder="비밀번호"
            />
            <label htmlFor="password-check" className={styles.label}>
              비밀번호 확인
            </label>
            <input
              id="password-check"
              name="password-check"
              className={styles.input}
              type="password"
              placeholder="******"
            />
            <label
              htmlFor="password-check"
              className={cn(styles.label, styles['label-profile'])}
            >
              프로필
            </label>
            <input
              id="image"
              name="image"
              className={styles['input-profile']}
              type="file"
              accept="image/*"
            />
            <button className={styles['login-button']}>회원가입</button>
          </form>
          <div className={styles['link-wrapper']}>
            <Link href="/auth/login">계정 있어요!</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
