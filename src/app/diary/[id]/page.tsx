import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getSingleDiary } from '@/lib/getSingleDiary';

import containerStyles from '@/app/foster/[id]/page.module.scss';
import { SingleDiary } from './_component/SingleDiary';

interface Props {
  params: { id: string };
}

const Page = async ({ params }: Props) => {
  const { id } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['diaries', id],
    queryFn: getSingleDiary,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <div className={containerStyles.wrapper}>
      <HydrationBoundary state={dehydratedState}>
        <SingleDiary id={id} />
      </HydrationBoundary>
    </div>
  );
};

export default Page;
