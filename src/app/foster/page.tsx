import { HydrationBoundary } from '@tanstack/react-query';

import { SubTitle } from '../_component/SubTitle';
import subTitleStyles from '../_component/subTitle.module.scss';
import { FosterTab } from './_component/FosterTab';
import { FosterAnimals } from './_component/FosterAnimals';
import { prefetchData } from '@/utils/prefetchData';
import { getFosters } from '@/lib/getFosters';

const FosterAnimalsPage = async () => {
  const selectedTab = 'dog';

  const dehydratedState = await prefetchData({
    queryKey: ['fosters', selectedTab],
    queryFn: ({ pageParam = 0 }) => getFosters({ selectedTab, pageParam }),
    initialPageParam: 0,
  });

  return (
    <>
      <div className={subTitleStyles['title-wrapper']}>
        <SubTitle title="임보 동물 찾기" />
        <FosterTab />
      </div>
      <HydrationBoundary state={dehydratedState}>
        <FosterAnimals />
      </HydrationBoundary>
    </>
  );
};

export default FosterAnimalsPage;
