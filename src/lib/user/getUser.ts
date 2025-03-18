export const getUser = async ({ queryKey }: { queryKey: [string, string] }) => {
  const [_1, id] = queryKey;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${id}`,
    {
      next: {
        tags: ['users', id],
      },
      cache: 'no-store',
      credentials: 'include',
    },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch user data.');
  }

  return res.json();
};
