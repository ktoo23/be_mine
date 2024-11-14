import { QueryClient, DehydratedState, dehydrate } from '@tanstack/react-query';

type PrefetchDataParams<TQueryFnData> = {
  queryKey: [string, string];
  queryFn: ({ pageParam }: { pageParam?: number }) => Promise<TQueryFnData>;
  initialPageParam?: number;
};

export const prefetchData = async <TQueryFnData>({
  queryKey,
  queryFn,
  initialPageParam = 0,
}: PrefetchDataParams<TQueryFnData>): Promise<DehydratedState> => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey,
    queryFn,
    initialPageParam,
  });

  return dehydrate(queryClient);
};
