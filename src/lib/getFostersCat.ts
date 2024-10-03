type Props = {
  pageParam?: number;
};

export async function getFostersCat({ pageParam }: Props) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/fosters/cat?cursor=${pageParam}`,
    {
      next: {
        tags: ['fosters', 'cat'],
      },
      cache: 'no-store',
    },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch');
  }
  return res.json();
}
