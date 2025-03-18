'use client';
import { HydrationBoundary } from '@tanstack/react-query';
import { getSingleDiary } from '@/lib/getSingleDiary';

import containerStyles from '@/app/foster/[id]/page.module.scss';
import { SingleDiary } from './_component/SingleDiary';
import { prefetchSingleData } from '@/utils/prefetchSingleData';
import { useDiaryTabStore } from '@/store/tab';

interface Props {
  params: { id: string };
}

const Page = ({ params }: Props) => {
  const { id } = params;
  const { selectedTab } = useDiaryTabStore();

  const dehydratedState = prefetchSingleData({
    queryKey: ['diaries', selectedTab, id],
    queryFn: getSingleDiary,
  });

  return (
    <div className={containerStyles.wrapper}>
      <HydrationBoundary state={dehydratedState}>
        <SingleDiary id={id} />
      </HydrationBoundary>
    </div>
  );
};

export default Page;
