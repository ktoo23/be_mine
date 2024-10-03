'use client';

import { useDiaryTabStore } from '@/store/tab';
import {
  InfiniteData,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import { DiarySummary } from '@/model/DiarySummary';

import containerStyles from '../page.module.scss';
import styles from '@/app/_component/animalCard.module.scss';

import { DiaryAnimalCard } from './DiaryAnimalCard';
import { getDiaries } from '@/lib/getDiaries';
import { Fragment, useEffect } from 'react';
import useThrottle from '@/utils/useThrottle';
import { useInView } from 'react-intersection-observer';

export const DiaryAnimals = () => {
  const { selectedTab } = useDiaryTabStore();
  const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery<
    DiarySummary[],
    Object,
    InfiniteData<DiarySummary[]>,
    [_1: string, _2: string],
    number
  >({
    queryKey: ['diaries', selectedTab],
    queryFn: ({ pageParam = 0 }) => getDiaries({ selectedTab, pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.at(-1)?.id,
    staleTime: 60 * 1000,
  });

  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
  });

  const throttledFetchNextPage = useThrottle(() => {
    if (!isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, 3000);

  useEffect(() => {
    if (inView) {
      // 화면에 보일 때
      // 스크롤 인식 시 throttle 적용하여 호출 제어
      throttledFetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, throttledFetchNextPage]);

  return (
    <div className={containerStyles.container}>
      <ul className={styles['animal-list']}>
        {data?.pages.map((page, i) => (
          <Fragment key={i}>
            {page.map((diary) => (
              <li key={diary.id} className={styles['animal-item']}>
                <DiaryAnimalCard diary={diary} />
              </li>
            ))}
          </Fragment>
        ))}
      </ul>
      <div ref={ref} style={{ height: 50 }} />
    </div>
  );
};
