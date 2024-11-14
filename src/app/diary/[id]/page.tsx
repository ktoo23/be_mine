import { HydrationBoundary } from '@tanstack/react-query';
import { getSingleDiary } from '@/lib/getSingleDiary';

import containerStyles from '@/app/foster/[id]/page.module.scss';
import { SingleDiary } from './_component/SingleDiary';
import { prefetchSingleData } from '@/utils/prefetchSingleData';

interface Props {
  params: { id: string };
}

const Page = async ({ params }: Props) => {
  const { id } = params;

  const dehydratedState = prefetchSingleData({
    queryKey: ['diaries', id],
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
