'use client';

import cn from 'classnames';
import { useMypageTabStore } from '@/store/mypageTab';
import styles from './tab.module.scss';

export const Tab = () => {
  const tabStore = useMypageTabStore();

  return (
    <div className={styles['tab-list']} role="tablist">
      <div
        className={
          tabStore.tab === 'foster'
            ? cn(styles['tab-indicator'], styles['tab-item'])
            : styles['tab-item']
        }
        role="tab"
        onClick={() => tabStore.setTab('foster')}
      >
        게시물
      </div>
      <div
        className={
          tabStore.tab === 'diary'
            ? cn(styles['tab-indicator'], styles['tab-item'])
            : styles['tab-item']
        }
        role="tab"
        onClick={() => tabStore.setTab('diary')}
      >
        일기
      </div>
    </div>
  );
};
