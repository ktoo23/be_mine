'use client';

import { useDiaryTabStore } from '@/store/tab';
import { DiarySummary } from '@/model/DiarySummary';

import { DiaryAnimalCard } from './DiaryAnimalCard';
import { getDiaries } from '@/lib/getDiaries';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { InfiniteAnimalList } from '@/app/_component/InifiniteAnimalList';
import { Spinner } from '@/app/_component/Spinner';

export const DiaryAnimals = () => {
  const { selectedTab } = useDiaryTabStore();

  const { data, isFetchingNextPage, ref } = useInfiniteScroll<DiarySummary>({
    queryKey: ['diaries', selectedTab],
    queryFn: ({ pageParam = 0 }) => getDiaries({ selectedTab, pageParam }),
    getNextPageParam: (lastPage) => lastPage.at(-1)?.id,
  });

  return (
    <>
      <InfiniteAnimalList
        data={data}
        renderItem={(diary) => <DiaryAnimalCard diary={diary} />}
        ref={ref}
      />
      {isFetchingNextPage && <Spinner />}
    </>
  );
};
