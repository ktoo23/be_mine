'use client';

import { Fragment, useEffect } from 'react';
import {
  InfiniteData,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { getFostersDog } from '@/lib/getFostersDog';
import { getFostersCat } from '@/lib/getFostersCat';
import { FosterSummary } from '@/model/FosterSummary';
import useThrottle from '@/utils/useThrottle';

import containerStyles from '../page.module.scss';
import styles from '@/app/_component/animalCard.module.scss';
import { FosterAnimalCard } from './FosterAnimalCard';
import { useFosterTabStore } from '@/store/tab';

export const FosterAnimals = () => {
  const { selectedTab } = useFosterTabStore();

  const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery<
    FosterSummary[],
    Object,
    InfiniteData<FosterSummary[]>,
    [_1: string, _2: string],
    number
  >({
    queryKey: ['fosters', selectedTab],
    queryFn: selectedTab === 'dog' ? getFostersDog : getFostersCat,
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
            {page.map((foster) => (
              <li key={foster.id} className={styles['animal-item']}>
                <FosterAnimalCard foster={foster} />
              </li>
            ))}
          </Fragment>
        ))}
      </ul>
      <div ref={ref} style={{ height: 50 }} />
    </div>
  );
};
