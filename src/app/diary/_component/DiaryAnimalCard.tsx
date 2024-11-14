import Image from 'next/image';
import Link from 'next/link';

import styles from '@/app/_component/animalCard.module.scss';
import detailStyles from './diaryAnimalCard.module.scss';
import { DiarySummary } from '@/model/DiarySummary';
import { IoPawSharp } from 'react-icons/io5';

type Props = {
  diary: DiarySummary;
};

export const DiaryAnimalCard = ({ diary }: Props) => {
  return (
    <Link href={`/diary/${diary.id}`} className={styles['animal-content']}>
      <div className={styles['animal-image']}>
        <Image
          src={diary.imageUrl}
          alt="임보 동물 정보"
          fill
          sizes="(max-width: 720px) 100vw, (max-width: 1420px) 50vw, 33vw"
        />
      </div>
      <div className={styles.overlay}>
        <p className={detailStyles.icons}>
          <IoPawSharp />
        </p>
        <h3 className={styles['animal-info']}>{diary.title}</h3>
        <p className={styles['animal-desc']}>{diary.content}</p>
      </div>
    </Link>
  );
};
