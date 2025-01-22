import { HydrationBoundary } from '@tanstack/react-query';
import { getDiaries } from '@/lib/getDiaries';
import { prefetchInfiniteData } from '@/utils/prefetchInifiniteData';

import { auth } from '@/auth';
import Link from 'next/link';

import pageTitleStyles from '../_component/pageTitle.module.scss';
import styles from './page.module.scss';

import { PageTitle } from '../_component/PageTitle';
import { DiaryTab } from './_component/DiaryTab';
import { DiaryAnimals } from './_component/DiaryAnimals';
import { PiPencil } from 'react-icons/pi';

const DiaryAnimalsPage = async () => {
  const session = await auth();

  const selectedTab = 'dog';

  const dehydratedState = await prefetchInfiniteData({
    queryKey: ['diaries', selectedTab],
    queryFn: ({ pageParam = 0 }) => getDiaries({ selectedTab, pageParam }),
    initialPageParam: 0,
  });

  return (
    <>
      <div className={pageTitleStyles['title-wrapper']}>
        <PageTitle title="임보 동물 일기" />
        <DiaryTab />
      </div>
      {session && (
        <div className={styles['post-button']}>
          <Link href="/diary/write" aria-label="임보 일기 작성 버튼">
            <PiPencil className={styles.icon} />
            <span>일기 작성하러 가기</span>
          </Link>
        </div>
      )}
      <HydrationBoundary state={dehydratedState}>
        <DiaryAnimals />
      </HydrationBoundary>
    </>
  );
};

export default DiaryAnimalsPage;
