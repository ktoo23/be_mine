'use client';
import { useRouter } from 'next/navigation';
import { useMypageTabStore } from '@/store/mypageTab';
import { getUserPosts } from '@/lib/user/getUserPosts';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import styles from './userPosts.module.scss';
import { Spinner } from '@/app/_component/Spinner';

type Props = {
  id: string;
};

export const UserPosts = ({ id }: Props) => {
  const tabStore = useMypageTabStore();
  const router = useRouter();

  const { data, isFetchingNextPage, ref } = useInfiniteScroll<{
    id: number;
    imageUrl: string;
  }>({
    queryKey: ['posts', 'users', id, tabStore.tab || 'foster'],
    queryFn: ({ pageParam = 0 }) =>
      getUserPosts({
        queryKey: ['posts', 'users', id, tabStore.tab || 'foster'],
        pageParam,
      }),
    getNextPageParam: (lastPage) => lastPage.at(-1)?.id,
  });

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
      {isFetchingNextPage && <Spinner />}
      {data && data?.pages[0].length > 8 && (
        <div ref={ref} style={{ height: 50 }} />
      )}
    </>
  );
};
