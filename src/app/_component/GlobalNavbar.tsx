import Image from 'next/image';
import Link from 'next/link';
import { LuUser } from 'react-icons/lu';
import cn from 'classnames';

import styles from './GlobalNavbar.module.scss';

export const GlobalNavbar = () => {
  return (
    <header className={styles['gnb-header']}>
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
                <Link href="/">임보동물 찾기</Link>
              </li>
              <li className={styles['gnb-nav-item']}>
                <Link href="/">임보 일기</Link>
              </li>
              <li className={styles['gnb-nav-item']}>
                <Link href="/">임보 테스트</Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className={cn(styles['gnb-right'], 'lg-only')}>
          <div className={styles['my-menu']}>
            <button className={styles['my-menu-button']}>
              <LuUser className={styles['user-icon']} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
