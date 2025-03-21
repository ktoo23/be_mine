import Link from 'next/link';

import cn from 'classnames';
import styles from './lnb.module.scss';
import { LuDog, LuUser } from 'react-icons/lu';
import { LuPencil } from 'react-icons/lu';
import { MdOutlineQuiz } from 'react-icons/md';
import { auth } from '@/auth';

export const LocalNavbar = async () => {
  const session = await auth();

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
          {!session ? (
            <Link href="/login">
              <LuUser className={styles.icon} />
              로그인
            </Link>
          ) : (
            <Link
              href={`/${session.user?.id}/mypage`}
              className={styles['profile-image']}
            >
              <img
                src={
                  session.user?.image
                    ? session.user.image
                    : '/images/img-user-default.png'
                }
                alt="프로필 사진"
              />
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};
