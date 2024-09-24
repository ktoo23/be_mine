import Link from 'next/link';

import cn from 'classnames';
import styles from './localNavbar.module.scss';
import { LuDog, LuUser } from 'react-icons/lu';
import { LuPencil } from 'react-icons/lu';
import { MdOutlineQuiz } from 'react-icons/md';

export const LocalNavbar = () => {
  return (
    <nav className={cn(`${styles.lnb}`, 'lg-hidden')}>
      <ul className={styles['lnb-list']}>
        <li className={styles['lnb-item']}>
          <Link href="/foster">
            <LuDog className={styles.icon} />
            임보 동물
          </Link>
        </li>
        <li className={styles['lnb-item']}>
          <Link href="/diary">
            <LuPencil className={styles.icon} />
            임보 일기
          </Link>
        </li>
        <li className={styles['lnb-item']}>
          <Link href="/" className={styles['title']}></Link>
        </li>
        <li className={styles['lnb-item']}>
          <Link href="/test">
            <MdOutlineQuiz className={styles.icon} />
            임보 유형
          </Link>
        </li>
        <li className={styles['lnb-item']}>
          <Link href="/auth/login">
            <LuUser className={styles.icon} />내 프로필
          </Link>
        </li>
      </ul>
    </nav>
  );
};
