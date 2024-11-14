'use client';

import { useDiaryTabStore } from '@/store/tab';
import { DiarySummary } from '@/model/DiarySummary';

import { DiaryAnimalCard } from './DiaryAnimalCard';
import { getDiaries } from '@/lib/getDiaries';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { InfiniteAnimalList } from '@/app/_component/InifiniteAnimalList';

export const DiaryAnimals = () => {
  const { selectedTab } = useDiaryTabStore();

  const { data, ref } = useInfiniteScroll<DiarySummary>({
    queryKey: ['diaries', selectedTab],
    queryFn: ({ pageParam = 0 }) => getDiaries({ selectedTab, pageParam }),
    getNextPageParam: (lastPage) => lastPage.at(-1)?.id,
  });

  return (
    <InfiniteAnimalList
      data={data}
      renderItem={(diary) => <DiaryAnimalCard diary={diary} />}
      ref={ref}
    />
  );
};
