import { auth } from '@/auth';
import { HydrationBoundary } from '@tanstack/react-query';
import containerStyles from '@/app/_component/containerStyle.module.scss';
import pageTitleStyles from '@/app/_component/pageTitle.module.scss';

import { PageTitle } from '@/app/_component/PageTitle';
import { UserInfo } from './_component/UserInfo';
import { Tab } from './_component/Tab';
import { UserPosts } from './_component/UserPosts';

import { getUserPosts } from '@/lib/user/getUserPosts';
import { prefetchInfiniteData } from '@/utils/prefetchInifiniteData';

type Props = {
  params: { id: string };
};

const Page = async ({ params }: Props) => {
  const session = await auth();
  const { id } = params;

  const dehydratedState = await prefetchInfiniteData({
    queryKey: ['posts', 'users', id, 'foster'],
    queryFn: ({ pageParam = 0 }) =>
      getUserPosts({ queryKey: ['posts', 'users', id, 'foster'], pageParam }),
    initialPageParam: 0,
  });

  return (
    <>
      <HydrationBoundary state={dehydratedState}>
        <div className={pageTitleStyles['title-wrapper']}>
          <PageTitle title="마이페이지" />
        </div>
        <div
          style={{ backgroundColor: 'white' }}
          className={containerStyles.container}
        >
          <UserInfo id={id} session={session} />
          <Tab />
          <UserPosts id={id} />
        </div>
      </HydrationBoundary>
    </>
  );
};

export default Page;