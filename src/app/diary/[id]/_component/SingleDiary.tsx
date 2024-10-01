'use client';

import { useQuery } from '@tanstack/react-query';
import styles from '../page.module.scss';

import DiaryHeader from './DiaryHeader';
import DiaryMain from './DiaryMain';
import { getSingleDiary } from '@/lib/getSingleDiary';
import { Diary } from '@/model/Diary';

type Props = {
  id: string;
};

export const SingleDiary = ({ id }: Props) => {
  const { data, error } = useQuery<
    Diary,
    Object,
    Diary,
    [_1: string, _2: string]
  >({
    queryKey: ['diaries', id],
    queryFn: getSingleDiary,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  if (!data) {
    return null;
  }

  const date = data.createdAt.toString().slice(0, 10);

  // TODO: error 일 때 처리

  return (
    <div className={styles['diary-container']}>
      <DiaryHeader User={data.User} date={date} />
      <DiaryMain Image={data.Image} title={data.title} content={data.content} />
    </div>
  );
};
