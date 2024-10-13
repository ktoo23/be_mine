'use client';

import { Session } from '@auth/core/types';
import styles from './userInfo.module.scss';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/lib/user/getUser';

type Props = {
  id: string;
  session: Session | null;
};
export const UserInfo = ({ id, session }: Props) => {
  const {
    data: user,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['users', id],
    queryFn: getUser,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  });

  if (!user) {
    return null;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles['user-card']}>
      <div className={styles['user-photo']}>
        <img src="/images/img-user-default.png" alt="유저 이미지" />
      </div>
      <h1 className={styles['user-name']}>{user.name}</h1>
      <button className={styles['user-update-btn']}>프로필 편집</button>
    </div>
  );
};
