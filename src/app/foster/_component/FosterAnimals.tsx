'use client';
import { FosterSummary } from '@/model/FosterSummary';
import { useFosterTabStore } from '@/store/tab';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { getFosters } from '@/lib/getFosters';

import { InfiniteAnimalList } from '@/app/_component/InifiniteAnimalList';
import { FosterAnimalCard } from './FosterAnimalCard';
import { Spinner } from '@/app/_component/Spinner';

export const FosterAnimals = () => {
  const { selectedTab } = useFosterTabStore();

  const { data, isFetchingNextPage, ref } = useInfiniteScroll<FosterSummary>({
    queryKey: ['fosters', selectedTab],
    queryFn: ({ pageParam = 0 }) => getFosters({ selectedTab, pageParam }),
    getNextPageParam: (lastPage) => lastPage.at(-1)?.id,
  });

  return (
    <>
      <InfiniteAnimalList
        data={data}
        renderItem={(foster) => <FosterAnimalCard foster={foster} />}
        ref={ref}
      />
      {isFetchingNextPage && <Spinner />}
    </>
  );
};
