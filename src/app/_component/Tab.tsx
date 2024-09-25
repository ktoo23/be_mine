'use client';

import { IoPawSharp } from 'react-icons/io5';
import cn from 'classnames';

import styles from '@/app/_component/tab.module.scss';
import { usePathname } from 'next/navigation';
import { useDiaryTabStore, useFosterTabStore } from '@/store/tab';

interface TabProps {
  tab1: string;
  tab2: string;
}

interface TabState {
  selectedTab: 'dog' | 'cat';
  setSelectedTab(selectedTab: 'dog' | 'cat'): void;
}

export const Tab = ({ tab1, tab2 }: TabProps) => {
  const pathname = usePathname();
  let tabStore: TabState;

  if (pathname === '/foster') {
    tabStore = useFosterTabStore();
  } else {
    // /diary
    tabStore = useDiaryTabStore();
  }

  return (
    <div className={styles['nav-container']}>
      <ul className={styles['nav-list']}>
        <li
          className={cn(styles['nav-item'], {
            [styles['is-active']]: tabStore.selectedTab === 'dog',
          })}
          onClick={() => {
            tabStore.setSelectedTab('dog');
          }}
        >
          {tab1}
          <IoPawSharp className={styles.icon} />
        </li>
        <li
          className={cn(styles['nav-item'], {
            [styles['is-active']]: tabStore.selectedTab === 'cat',
          })}
          onClick={() => {
            tabStore.setSelectedTab('cat');
          }}
        >
          {tab2}
          <IoPawSharp className={styles.icon} />
        </li>
      </ul>
    </div>
  );
};
