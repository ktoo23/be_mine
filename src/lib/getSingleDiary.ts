export const getSingleDiary = async ({
  queryKey,
}: {
  queryKey: [string, 'dog' | 'cat', string];
}) => {
  const [_1, selectedTab, id] = queryKey;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/diaries/${selectedTab}/${id}`,
    {
      next: {
        tags: ['diaries', selectedTab, id],
      },
      cache: 'no-store',
      credentials: 'include',
    },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch post data.');
  }

  return res.json();
};
