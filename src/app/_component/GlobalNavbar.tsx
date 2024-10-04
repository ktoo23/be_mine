'use client';

import Image from 'next/image';
import Link from 'next/link';
import { LuUser } from 'react-icons/lu';
import { LuLogOut } from 'react-icons/lu';
import cn from 'classnames';

import styles from './globalNavbar.module.scss';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { DropdownMenu } from './DropdownMenu';
import { useDropdownStore } from '@/store/dropdown';

export const GlobalNavbar = () => {
  const { data } = useSession();
  const { isOpen, setOpen } = useDropdownStore();

  const path = usePathname();
  let className = '';

  if (path !== '/') {
    className += 'bg-white';
  }

  const handleDropdownState = () => {
    setOpen(!isOpen);
  };

  return (
    <header className={cn(styles['gnb-header'], styles[`${className}`])}>
      <div className={styles['gnb-wrapper']}>
        <div className={styles['gnb-left']}>
          <h1 className={styles.logo}>
            <Link href="/">
              <Image
                src="https://nextjs.org/icons/next.svg"
                alt="Next.js logo"
                width={100}
                height={30}
                priority
              />
            </Link>
          </h1>

          <nav className={cn(styles['gnb-nav'], 'lg-only')}>
            <h2 className="visually-hidden">메뉴</h2>
            <ul className={styles['gnb-nav-list']}>
              <li className={styles['gnb-nav-item']}>
                <Link href="/foster">임보동물 찾기</Link>
              </li>
              <li className={styles['gnb-nav-item']}>
                <Link href="/diary">임보 일기</Link>
              </li>
              <li className={styles['gnb-nav-item']}>
                <Link href="/test">임보 테스트</Link>
              </li>
            </ul>
          </nav>
        </div>

        {data?.user && (
          <div className={cn('lg-hidden', styles['logout-button'])}>
            <LuLogOut onClick={() => signOut({ redirectTo: '/' })} />
          </div>
        )}

        <div className={cn(styles['gnb-right'], 'lg-only')}>
          <div className={styles['my-menu']}>
            {!data ? (
              <Link href="/login" className={styles['my-menu-button']}>
                <LuUser className={styles['user-icon']} />
              </Link>
            ) : (
              <div
                onClick={handleDropdownState}
                className={cn(
                  styles['my-menu-button'],
                  styles['profile-image'],
                )}
              >
                <img
                  src={
                    data.user?.image
                      ? data.user.image
                      : '/images/img-user-default.png'
                  }
                  alt="프로필 사진"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <DropdownMenu />
    </header>
  );
};
