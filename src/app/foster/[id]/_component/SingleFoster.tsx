'use client';

import { AnimalInfo } from './AnimalInfo';
import { ImageSlider } from './ImageSlider';
import { AnimalDetails } from './AnimalDetails';

import styles from '../page.module.scss';
import { useQuery } from '@tanstack/react-query';
import { getSingleFoster } from '@/lib/getSingleFoster';
import { Foster } from '@/model/Foster';

type Props = {
  id: string;
};

export const SingleFoster = ({ id }: Props) => {
  const { data, error } = useQuery<
    Foster,
    Object,
    Foster,
    [_1: string, _2: string]
  >({
    queryKey: ['fosters', id],
    queryFn: getSingleFoster,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  if (!data) {
    return null;
  }

  // TODO: error 일 때 처리

  return (
    <div className={styles.wrapper}>
      <ImageSlider images={data.Images} />
      <AnimalInfo
        animal={data.Animal}
        announcementNo={data.announcementNo}
        date={data.createdAt}
      />
      <div className={styles['section-wrapper']}>
        <AnimalDetails title="소개" type="detail" content={data.Detail} />
        <AnimalDetails
          title="임보 조건"
          type="foster"
          content={data.FosterCondition}
        />
        <AnimalDetails title="건강 정보" type="health" content={data.Health} />
        <AnimalDetails
          title="저에 대한 정보에요"
          type="behavior"
          content={data.Behavior}
        />
      </div>
    </div>
  );
};
