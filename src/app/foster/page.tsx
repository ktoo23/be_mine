import { HydrationBoundary } from '@tanstack/react-query';

import { PageTitle } from '../_component/PageTitle';
import pageTitleStyles from '../_component/pageTitle.module.scss';
import { FosterTab } from './_component/FosterTab';
import { FosterAnimals } from './_component/FosterAnimals';
import { prefetchInfiniteData } from '@/utils/prefetchInifiniteData';
import { getFosters } from '@/lib/getFosters';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '임보 게시글 보기 / Be mine.',
  description: '임보 게시글',
};

const FosterAnimalsPage = async () => {
  const selectedTab = 'dog';

  const dehydratedState = await prefetchInfiniteData({
    queryKey: ['fosters', selectedTab],
    queryFn: ({ pageParam = 0 }) => getFosters({ selectedTab, pageParam }),
    initialPageParam: 0,
  });

  return (
    <>
      <div className={pageTitleStyles['title-wrapper']}>
        <PageTitle title="임보 동물 찾기" />
        <FosterTab />
      </div>
      <HydrationBoundary state={dehydratedState}>
        <FosterAnimals />
      </HydrationBoundary>
    </>
  );
};

export default FosterAnimalsPage;
