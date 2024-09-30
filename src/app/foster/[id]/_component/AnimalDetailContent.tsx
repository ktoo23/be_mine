import { DetailedInformation } from '@/model/DetailedInformation';
import styles from './animalDetailContent.module.scss';

type Props = {
  detail: DetailedInformation;
};

export const AnimalDetailContent = ({ detail }: Props) => {
  return (
    <div className={styles['animal-section-content']}>
      <strong className={styles.title}>구조사연</strong>
      <p className={styles.description}>{detail.rescueStory}</p>
      <strong className={styles.title}>성격 및 특징</strong>
      <p className={styles.description}>{detail.personalityStory}</p>
    </div>
  );
};
