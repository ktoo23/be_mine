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
  return (
    <Link href="/" className={styles['animal-content']}>
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
          width={350}
          height={480}
        />
      </div>
      <div className={styles.overlay}>
        <h3 className={styles['animal-info']}>
          {foster.animal.name}/{foster.animal.gender}
        </h3>
        <p className={styles['animal-number']}>
          공고번호: {foster.announcementNo}
        </p>
        <p className={detailStyles['animal-desc']}>
          {foster.animal.rescueStory}
          앙꼬는 폭우 쏟아지는 날 어미를 잃은건지 혼자서 차 밑에 웅크리고
          있었습니다. 구조자님이 배고플까봐 밥을 챙겨주던 중에 비가 갑자기 많이
          쏟아져 앙꼬가 위험하다 판단되어 급하게 구조하게 되었습니다.
        </p>
      </div>
    </Link>
  );
};
