import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import subTitleStyles from '../_component/subTitle.module.scss';

import { SubTitle } from '../_component/SubTitle';
import { DiaryTab } from './_component/DiaryTab';
import { DiaryAnimals } from './_component/DiaryAnimals';
import { getDiaries } from '@/lib/getDiaries';

const DiaryAnimalsPage = async () => {
  const selectedTab = 'dog';
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['diaries', 'dog'],
    queryFn: ({ pageParam = 0 }) => getDiaries({ selectedTab, pageParam }),
    initialPageParam: 0,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <>
      <div className={subTitleStyles['title-wrapper']}>
        <SubTitle title="임보 동물 일기" />
        <DiaryTab />
      </div>
      <HydrationBoundary state={dehydratedState}>
        <DiaryAnimals />
      </HydrationBoundary>
    </>
  );
};

export default DiaryAnimalsPage;
