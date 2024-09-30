import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getSingleFoster } from '@/lib/getSingleFoster';

import styles from './page.module.scss';
import { SingleFoster } from './_component/SingleFoster';

type Props = {
  params: { id: string };
};

const Page = async ({ params }: Props) => {
  const { id } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['fosters', id],
    queryFn: getSingleFoster,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className={styles.container}>
      <HydrationBoundary state={dehydratedState}>
        <SingleFoster id={id} />
      </HydrationBoundary>
    </div>
  );
};

export default Page;
