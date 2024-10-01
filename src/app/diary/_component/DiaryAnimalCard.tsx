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
    <Link href="/" className={styles['animal-content']}>
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
        <h3 className={styles['animal-info']}>콩이랑 산책가기~</h3>
        <p className={styles['animal-desc']}>
          앙꼬는 폭우 쏟아지는 날 어미를 잃은건지 혼자서 차 밑에 웅크리고
          있었습니다. 구조자님이 배고플까봐 밥을 챙겨주던 중에 비가 갑자기 많이
          쏟아져 앙꼬가 위험하다 판단되어 급하게 구조하게 되었습니다.
        </p>
      </div>
    </Link>
  );
};
