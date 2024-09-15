import { IoPawSharp } from 'react-icons/io5';
import cn from 'classnames';

import styles from './fosterNavbar.module.scss';

export const FosterNavbar = () => {
  return (
    <div className={styles['nav-container']}>
      <ul className={styles['nav-list']}>
        <li className={styles['nav-item']}>
          내 주인이 되!
          <IoPawSharp className={styles.icon} />
        </li>
        <li className={cn(styles['nav-item'], styles['is-active'])}>
          내 집사가 되.
          <IoPawSharp className={styles.icon} />
        </li>
      </ul>
    </div>
  );
};
