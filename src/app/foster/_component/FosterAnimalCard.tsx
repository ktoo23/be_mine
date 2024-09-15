import Image from 'next/image';
import Link from 'next/link';

import styles from './fosterAnimalCard.module.scss';
// status - 임보가능, 임보중, 입양완료, 공고종료 type - 일반임보,
// 단기임보, 입양전제, 수유임보, 긴급임보

export const FosterAnimalCard = () => {
  return (
    <Link href="/" className={styles['foster-animal-content']}>
      <div className={styles['btn-wrapper']}>
        <button className={styles.status}>임보중</button>
        <button className={styles.type}>입양전제</button>
      </div>
      <div className={styles['foster-animal-image']}>
        <Image
          src="/images/20240913130110.jpg"
          alt="임보 동물 정보"
          width={348}
          height={480}
        />
      </div>
      <div className={styles.overlay}>
        <h3 className={styles['foster-animal-info']}>앙꼬/남</h3>
        <p className={styles['foster-animal-number']}>공고번호: 2024-02-077</p>
        <p className={styles['foster-animal-desc']}>
          앙꼬는 폭우 쏟아지는 날 어미를 잃은건지 혼자서 차 밑에 웅크리고
          있었습니다. 구조자님이 배고플까봐 밥을 챙겨주던 중에 비가 갑자기 많이
          쏟아져 앙꼬가 위험하다 판단되어 급하게 구조하게 되었습니다.
        </p>
      </div>
    </Link>
  );
};
