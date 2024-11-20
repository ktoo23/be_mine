import { FaSpinner } from 'react-icons/fa6';
import styles from './spinner.module.scss';

export const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <FaSpinner className={styles.icon} />
    </div>
  );
};
