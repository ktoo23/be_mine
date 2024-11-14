export const getSingleDiary = async ({
  queryKey,
}: {
  queryKey: [string, string];
}) => {
  const [_1, id] = queryKey;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/diaries/${id}`,
    {
      next: {
        tags: ['diaries', id],
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
