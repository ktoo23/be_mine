import { Animal } from '@/model/Animal';
import styles from './animalInfo.module.scss';

type Props = {
  animal: Animal;
  announcementNo: string;
  date: Date;
};

export const AnimalInfo = ({ animal, announcementNo, date }: Props) => {
  /*
   *TODO: Tag component 분리
   *
   */
  const createdDate = date.toString().slice(0, 10);
  return (
    <div className={styles['animal-info']}>
      <div className={styles['animal-info-misc']}>
        <p className="visually-hidden">{animal.id}</p>
        <p className={styles.number}>공고번호: {announcementNo}</p>
        <p className={styles.date}>{createdDate}</p>
      </div>
      <h1 className={styles['animal-info-title']}>
        {animal.name}/{animal.gender}/{animal.weight}
      </h1>
      <ul className={styles['tag-list']}>
        <li className={styles['tag-item']}># 애교쟁이</li>
        <li className={styles['tag-item']}># 사람좋아</li>
        <li className={styles['tag-item']}># 매미좋아</li>
        <li className={styles['tag-item']}># 꾸러기</li>
      </ul>

      <div className={styles['animal-info-detail']}>
        <dl className={styles['info-list']}>
          <div className={styles['info-item']}>
            <dt>현 상황</dt>
            <dd>{animal.currentStatus}</dd>
          </div>
          <div className={styles['info-item']}>
            <dt>임보종류</dt>
            <dd>{animal.fosterType}</dd>
          </div>
          <div className={styles['info-item']}>
            <dt>이름</dt>
            <dd>{animal.name}</dd>
          </div>
          <div className={styles['info-item']}>
            <dt>구조 지역</dt>
            <dd>{animal.rescueLocation}</dd>
          </div>
          <div className={styles['info-item']}>
            <dt>성별</dt>
            <dd>{animal.gender}</dd>
          </div>
          <div className={styles['info-item']}>
            <dt>중성화 여부</dt>
            <dd>{animal.neutered}</dd>
          </div>
          <div className={styles['info-item']}>
            <dt>출생시기</dt>
            <dd>{animal.birth}</dd>
          </div>
          <div className={styles['info-item']}>
            <dt>몸무게</dt>
            <dd>{animal.weight}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};
