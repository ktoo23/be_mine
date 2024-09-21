import Image from 'next/image';
import Link from 'next/link';
import cn from 'classnames';

import styles from '@/app/_component/animalCard.module.scss';
import detailStyles from './diaryAnimalCard.module.scss';

export const DiaryAnimalCard = () => {
  return (
    <Link href="/" className={styles['animal-content']}>
      <div className={styles['animal-image']}>
        <Image
          src="/images/20240913130110.jpg"
          alt="임보 동물 정보"
          width={348}
          height={480}
        />
      </div>
      <div className={cn(styles.overlay, detailStyles['detail-overlay'])}>
        <h3 className={styles['animal-info']}>앙꼬/남</h3>
        <p
          className={cn(styles['animal-number'], detailStyles['detail-number'])}
        >
          공고번호: 2024-02-077
        </p>
      </div>
    </Link>
  );
};
