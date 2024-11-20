import { QueryClient, DehydratedState, dehydrate } from '@tanstack/react-query';

type PrefetchSingleDataParams<TQueryFnData> = {
  queryKey: [string, string];
  queryFn: ({
    queryKey,
  }: {
    queryKey: [string, string];
  }) => Promise<TQueryFnData>;
};

export const prefetchSingleData = async <TQueryFnData>({
  queryKey,
  queryFn,
}: PrefetchSingleDataParams<TQueryFnData>): Promise<DehydratedState> => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey,
    queryFn,
  });

  return dehydrate(queryClient);
};
