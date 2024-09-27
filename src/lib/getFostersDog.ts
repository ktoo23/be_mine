export async function getFostersDog() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/fosters/dog`,
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
