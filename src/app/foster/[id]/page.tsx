'use client';
import { HydrationBoundary } from '@tanstack/react-query';
import { getSingleFoster } from '@/lib/getSingleFoster';

import styles from './page.module.scss';
import { SingleFoster } from './_component/SingleFoster';
import { prefetchSingleData } from '@/utils/prefetchSingleData';
import { useFosterTabStore } from '@/store/tab';

type Props = {
  params: { id: string };
};

const Page = ({ params }: Props) => {
  const { id } = params;

  const { selectedTab } = useFosterTabStore();

  const dehydratedState = prefetchSingleData({
    queryKey: ['fosters', selectedTab || 'dog', id],
    queryFn: getSingleFoster,
  });

  return (
    <div className={styles.container}>
      <HydrationBoundary state={dehydratedState}>
        <SingleFoster id={id} />
      </HydrationBoundary>
    </div>
  );
};

export default Page;
