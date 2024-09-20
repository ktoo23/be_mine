import { PiPawPrintFill } from 'react-icons/pi';

import styles from './animalDetails.module.scss';

interface AnimalDetailHeaderProps {
  title: string;
}

export const AnimalDetailHeader = ({ title }: AnimalDetailHeaderProps) => {
  return (
    <header className={styles['animal-section-header']}>
      <h1>
        <PiPawPrintFill className={styles.icon} />
        {title}
      </h1>
    </header>
  );
};
