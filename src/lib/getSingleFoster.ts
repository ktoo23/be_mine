export const getSingleFoster = async ({
  queryKey,
}: {
  queryKey: [string, string];
}) => {
  const [_1, id] = queryKey;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/fosters/${id}`,
    {
      next: {
        tags: ['fosters', id],
      },
      credentials: 'include',
    },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch post data.');
  }

  return res.json();
};
