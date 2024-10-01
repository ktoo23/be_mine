'use client';

import { useDiaryTabStore } from '@/store/tab';
import { useQuery } from '@tanstack/react-query';
import { DiarySummary } from '@/model/DiarySummary';

import containerStyles from '../page.module.scss';
import styles from '@/app/_component/animalCard.module.scss';

import { DiaryAnimalCard } from './DiaryAnimalCard';
import { getDiaries } from '@/lib/getDiaries';

export const DiaryAnimals = () => {
  const { selectedTab } = useDiaryTabStore();
  const { data } = useQuery<DiarySummary[]>({
    queryKey: ['diaries', selectedTab],
    queryFn: () => getDiaries(selectedTab),
  });

  return (
    <div className={containerStyles.container}>
      <ul className={styles['animal-list']}>
        {data?.map((diary) => (
          <li key={diary.id} className={styles['animal-item']}>
            <DiaryAnimalCard diary={diary} />
          </li>
        ))}
      </ul>
    </div>
  );
};
