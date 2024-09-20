import styles from './animalInfo.module.scss';

export const AnimalInfo = () => {
  /*
   *TODO: Tag component 분리
   *
   */
  return (
    <div className={styles['animal-info']}>
      <div className={styles['animal-info-misc']}>
        <p className={styles.number}>공고번호: 2024-01-785</p>
        <p className={styles.date}>2024-09-16</p>
      </div>
      <h1 className={styles['animal-info-title']}>장군이/남/12kg</h1>
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
            <dd>임보가능</dd>
          </div>
          <div className={styles['info-item']}>
            <dt>임보종류</dt>
            <dd>입양전제</dd>
          </div>
          <div className={styles['info-item']}>
            <dt>이름</dt>
            <dd>장군이</dd>
          </div>
          <div className={styles['info-item']}>
            <dt>구조 지역</dt>
            <dd>전남 광양</dd>
          </div>
          <div className={styles['info-item']}>
            <dt>성별</dt>
            <dd>남</dd>
          </div>
          <div className={styles['info-item']}>
            <dt>중성화 여부</dt>
            <dd>완료</dd>
          </div>
          <div className={styles['info-item']}>
            <dt>출생시기</dt>
            <dd>2024 추정</dd>
          </div>
          <div className={styles['info-item']}>
            <dt>몸무게</dt>
            <dd>12kg</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};
