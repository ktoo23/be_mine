import Image from 'next/image';
import Link from 'next/link';
import cn from 'classnames';

import styles from '@/app/_component/animalCard.module.scss';
import detailStyles from './diaryAnimalCard.module.scss';
import { DiarySummary } from '@/model/DiarySummary';

type Props = {
  diary: DiarySummary;
};

export const DiaryAnimalCard = ({ diary }: Props) => {
  return (
    <Link href="/" className={styles['animal-content']}>
      <div className={styles['animal-image']}>
        <Image
          src={diary.imageUrl}
          alt="임보 동물 정보"
          width={348}
          height={480}
        />
      </div>
      <div className={cn(styles.overlay, detailStyles['detail-overlay'])}>
        <h3 className={styles['animal-info']}>
          {diary.animal.name}/{diary.animal.gender}
        </h3>
        <p
          className={cn(styles['animal-number'], detailStyles['detail-number'])}
        >
          공고번호: {diary.announcementNo}
        </p>
      </div>
    </Link>
  );
};
