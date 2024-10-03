type Props = {
  selectedTab: string;
  pageParam: number;
};

export async function getDiaries({ selectedTab, pageParam }: Props) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/diaries/${selectedTab}?cursor=${pageParam}`,
    {
      next: {
        tags: ['diaries', selectedTab],
      },
      cache: 'no-store',
    },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch');
  }
  return res.json();
}
