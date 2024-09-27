'use client';

import { useQuery } from '@tanstack/react-query';
import { getFostersDog } from '@/lib/getFostersDog';
import { getFostersCat } from '@/lib/getFostersCat';
import { FosterSummary } from '@/model/FosterSummary';

import containerStyles from '../page.module.scss';
import styles from '@/app/_component/animalCard.module.scss';
import { FosterAnimalCard } from './FosterAnimalCard';
import { useFosterTabStore } from '@/store/tab';

export const FosterAnimals = () => {
  const { selectedTab } = useFosterTabStore();

  const { data } = useQuery<FosterSummary[]>({
    queryKey: ['fosters', selectedTab],
    queryFn: selectedTab === 'dog' ? getFostersDog : getFostersCat,
  });

  return (
    <div className={containerStyles.container}>
      <ul className={styles['animal-list']}>
        {data?.map((foster) => (
          <li key={foster.id} className={styles['animal-item']}>
            <FosterAnimalCard foster={foster} />
          </li>
        ))}
      </ul>
    </div>
  );
};
