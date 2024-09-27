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
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['diaries', 'dog'],
    queryFn: () => getDiaries('dog'),
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
