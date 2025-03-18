export const getAnimals = async ({
  queryKey,
}: {
  queryKey: [string, string];
}) => {
  const [_1, search] = queryKey;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/animals?search=${search}`,
    {
      next: {
        tags: ['animals', search],
      },
      credentials: 'include',
      cache: 'no-store',
    },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch post data.');
  }

  return res.json();
};
