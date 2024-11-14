import { useInfiniteQuery, InfiniteData } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import useThrottle from './useThrottle';
import { useEffect } from 'react';

type InfiniteScrollOptions<T> = {
  queryKey: [string, string];
  queryFn: ({ pageParam }: { pageParam?: number }) => Promise<T[]>;
  getNextPageParam: (lastPage: T[]) => number | undefined;
  staleTime?: number;
};

export const useInfiniteScroll = <T>({
  queryKey,
  queryFn,
  getNextPageParam,
  staleTime = 60000, // 기본값 60초
}: InfiniteScrollOptions<T>) => {
  const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery<
    T[],
    unknown,
    InfiniteData<T[]>,
    [string, string],
    number
  >({
    queryKey,
    queryFn,
    initialPageParam: 0,
    getNextPageParam,
    staleTime,
  });

  const { ref, inView } = useInView({ threshold: 0, delay: 0 });

  const throttledFetchNextPage = useThrottle(() => {
    if (!isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, 3000);

  useEffect(() => {
    if (inView) {
      throttledFetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, throttledFetchNextPage]);

  return { data, ref };
};
