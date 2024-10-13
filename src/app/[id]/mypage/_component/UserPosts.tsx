'use client';
import {
  InfiniteData,
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import styles from './userPosts.module.scss';
import { useMypageTabStore } from '@/store/mypageTab';
import { getUserPosts } from '@/lib/user/getUserPosts';
import { Post } from '@/model/Post';
import useThrottle from '@/utils/useThrottle';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/navigation';

type Props = {
  id: string;
};

export const UserPosts = ({ id }: Props) => {
  const tabStore = useMypageTabStore();
  const router = useRouter();

  const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery<
    Post[],
    Object,
    InfiniteData<Post[]>,
    [_1: string, _2: string, _3: string, _4: string],
    number
  >({
    queryKey: ['posts', 'users', id, tabStore.tab || 'foster'],
    queryFn: getUserPosts,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.at(-1)?.id,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['users', id]);

  if (!user) {
    return null;
  }

  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
  });

  const throttledFetchNextPage = useThrottle(() => {
    if (!isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, 3000);

  useEffect(() => {
    if (inView) {
      // 화면에 보일 때
      // 스크롤 인식 시 throttle 적용하여 호출 제어
      throttledFetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, throttledFetchNextPage]);

  const handleMovePost = (id: number) => {
    console.log(tabStore.tab);
    if (tabStore.tab === 'foster' || tabStore.tab === 'bookmark') {
      router.push(`/foster/${id}`);
    } else {
      router.push(`/diary/${id}`);
    }
  };

  return (
    <>
      <p className={styles['post-count']}>
        게시물 <strong>22</strong>개
      </p>
      <div className={styles['post-list']}>
        {data?.pages.map((page) =>
          page.map((post) => (
            <div
              className={styles['post-card']}
              key={post.id}
              onClick={() => handleMovePost(post.id)}
            >
              <img src={post.imageUrl} alt="게시물 이미지" />
            </div>
          )),
        )}
      </div>
      {data && data?.pages[0].length > 8 && (
        <div ref={ref} style={{ height: 50 }} />
      )}
    </>
  );
};
