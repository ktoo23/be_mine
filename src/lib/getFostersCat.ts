export async function getFostersCat() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/fosters/cat`,
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
