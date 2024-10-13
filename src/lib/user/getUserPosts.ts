type Props = {
  queryKey: [string, string, string, string];
  pageParam: number;
};

export async function getUserPosts({ queryKey, pageParam }: Props) {
  const [_1, _2, id, selectedTab] = queryKey;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${id}/${selectedTab}?cursor=${pageParam}`,
    {
      next: {
        tags: ['posts', 'users', id, selectedTab],
      },
      cache: 'no-store',
    },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch');
  }
  return res.json();
}
