import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { SubTitle } from '../_component/SubTitle';
import subTitleStyles from '../_component/subTitle.module.scss';
import { FosterTab } from './_component/FosterTab';
import { FosterAnimals } from './_component/FosterAnimals';
import { getFostersDog } from '@/lib/getFostersDog';

const FosterAnimalsPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['fosters', 'dog'],
    queryFn: getFostersDog,
  });

  const dehydratedState = dehydrate(queryClient);

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
