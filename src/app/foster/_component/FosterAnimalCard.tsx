import Image from 'next/image';
import Link from 'next/link';

import styles from '@/app/_component/animalCard.module.scss';
import detailStyles from './fosterAnimalCard.module.scss';
import { FosterSummary } from '@/model/FosterSummary';
// status - 임보가능, 임보중, 입양완료, 공고종료 type - 일반임보,
// 단기임보, 입양전제, 수유임보, 긴급임보

type Props = {
  foster: FosterSummary;
};

export const FosterAnimalCard = ({ foster }: Props) => {
  if (!foster) {
    return null;
  }

  return (
    <Link href={`/foster/${foster.id}`} className={styles['animal-content']}>
      <div className={detailStyles['btn-wrapper']}>
        <button className={detailStyles.status}>
          {foster.animal.currentStatus}
        </button>
        <button className={detailStyles.type}>
          {foster.animal.fosterType}
        </button>
      </div>
      <div className={styles['animal-image']}>
        <Image
          src={foster.imageUrl}
          alt="임보 동물 정보"
          fill
          sizes="(max-width: 720px) 100vw, (max-width: 1420px) 50vw, 33vw"
        />
      </div>
      <div className={styles.overlay}>
        <h3 className={styles['animal-info']}>
          {foster.animal.name}/{foster.animal.gender}/{foster.animal.weight}
        </h3>
        <p className={styles['animal-number']}>
          공고번호: {foster.announcementNo}
        </p>
        <p className={styles['animal-desc']}>{foster.animal.rescueStory}</p>
      </div>
    </Link>
  );
};
