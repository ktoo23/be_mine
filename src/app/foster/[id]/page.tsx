import { HydrationBoundary } from '@tanstack/react-query';
import { getSingleFoster } from '@/lib/getSingleFoster';

import styles from './page.module.scss';
import { SingleFoster } from './_component/SingleFoster';
import { prefetchSingleData } from '@/utils/prefetchSingleData';

type Props = {
  params: { id: string };
};

const Page = async ({ params }: Props) => {
  const { id } = params;

  const dehydratedState = prefetchSingleData({
    queryKey: ['fosters', id],
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
