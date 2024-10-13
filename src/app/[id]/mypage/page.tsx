import { auth } from '@/auth';
import {
  dehydrate,
  HydrationBoundary,
  InfiniteData,
  QueryClient,
} from '@tanstack/react-query';

import containerStyles from '@/app/_component/containerStyle.module.scss';
import subTitleStyles from '@/app/_component/subTitle.module.scss';

import { SubTitle } from '@/app/_component/SubTitle';
import { UserInfo } from './_component/UserInfo';
import { Tab } from './_component/Tab';
import { UserPosts } from './_component/UserPosts';

import { getUser } from '@/lib/user/getUser';
import { getUserPosts } from '@/lib/user/getUserPosts';
import { Post } from '@/model/Post';

type Props = {
  params: { id: string };
};

const Page = async ({ params }: Props) => {
  const session = await auth();
  const { id } = params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['users', id],
    queryFn: getUser,
  });

  await queryClient.prefetchInfiniteQuery<
    Post[],
    Object,
    InfiniteData<Post[]>,
    [_1: string, _2: string, _3: string, _4: string],
    number
  >({
    queryKey: ['posts', 'users', id, 'foster'],
    queryFn: getUserPosts,
    initialPageParam: 0,
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <>
      <HydrationBoundary state={dehydratedState}>
        <div className={subTitleStyles['title-wrapper']}>
          <SubTitle title="마이페이지" />
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
