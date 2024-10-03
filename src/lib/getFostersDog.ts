type Props = {
  pageParam?: number;
};

export async function getFostersDog({ pageParam }: Props) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/fosters/dog?cursor=${pageParam}`,
    {
      next: {
        tags: ['fosters', 'dog'],
      },
      cache: 'no-store',
    },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch');
  }
  return res.json();
}
