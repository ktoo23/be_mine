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
  const animalInfo = [
    { label: '현 상황', value: animal.currentStatus },
    { label: '임보종류', value: animal.fosterType },
    { label: '이름', value: animal.name },
    { label: '구조 지역', value: animal.rescueLocation },
    { label: '성별', value: animal.gender },
    { label: '중성화 여부', value: animal.neutered },
    { label: '출생시기', value: animal.birth },
    { label: '몸무게', value: animal.weight },
  ];
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
          {animalInfo.map((info, index) => (
            <div className={styles['info-item']} key={index}>
              <dt>{info.label}</dt>
              <dd>{info.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};
