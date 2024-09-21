import { IoPawSharp } from 'react-icons/io5';
import cn from 'classnames';

import styles from '@/app/_component/tab.module.scss';

interface TabProps {
  tab1: string;
  tab2: string;
}

export const Tab = ({ tab1, tab2 }: TabProps) => {
  return (
    <div className={styles['nav-container']}>
      <ul className={styles['nav-list']}>
        <li className={styles['nav-item']}>
          {tab1}
          <IoPawSharp className={styles.icon} />
        </li>
        <li className={cn(styles['nav-item'], styles['is-active'])}>
          {tab2}
          <IoPawSharp className={styles.icon} />
        </li>
      </ul>
    </div>
  );
};
