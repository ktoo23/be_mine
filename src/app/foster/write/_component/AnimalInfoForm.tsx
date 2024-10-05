import styles from './postForm.module.scss';
import cn from 'classnames';

export const AnimalInfoForm = () => {
  return (
    <div className={styles['animal-info']}>
      <div className={styles.inputDiv}>
        <p className={styles.title}>종</p>
        <input
          type="radio"
          id="dog"
          name="species"
          value="강아지"
          defaultChecked
        />
        <label htmlFor="dog">강아지</label>

        <input type="radio" id="cat" name="species" value="고양이" />
        <label htmlFor="cat">고양이</label>
      </div>
      <div className={styles.inputDiv}>
        <label className={styles.inputLabel} htmlFor="current-status">
          현 상황
        </label>
        <select id="current-status" name="currentStatus">
          <option value="임보가능">임보가능</option>
          <option value="임보중">임보중</option>
          <option value="입양완료">입양완료</option>
          <option value="공고종료">공고종료</option>
        </select>
      </div>
      <div className={styles.inputDiv}>
        <label className={styles.inputLabel} htmlFor="foster-type">
          임보 종류
        </label>
        <select id="foster-type" name="fosterType">
          <option value="일반임보">일반임보</option>
          <option value="단기임보">단기임보</option>
          <option value="입양전제">입양전제</option>
          <option value="수유임보">수유임보</option>
          <option value="긴급임보">긴급임보</option>
        </select>
      </div>
      <div className={styles.inputDiv}>
        <label className={styles.inputLabel} htmlFor="animal-name">
          이름
        </label>
        <input id="animal-name" name="animalName" className={styles.input} />
      </div>
      <div className={styles.inputDiv}>
        <label className={styles.inputLabel} htmlFor="rescue-location">
          구조 지역
        </label>
        <input
          id="rescue-location"
          name="rescueLocation"
          className={styles.input}
        />
      </div>
      <div className={styles.inputDiv}>
        <p className={styles.title}>성별</p>
        <input type="radio" id="male" name="gender" value="남" defaultChecked />
        <label htmlFor="male">남</label>

        <input type="radio" id="female" name="gender" value="여" />
        <label htmlFor="female">여</label>
      </div>
      <div className={styles.inputDiv}>
        <p className={styles.title}>중성화</p>
        <input
          type="radio"
          id="completed"
          name="neutered"
          value="완료"
          defaultChecked
        />
        <label htmlFor="completed">완료</label>
        <input type="radio" id="incomplete" name="neutered" value="미완료" />
        <label htmlFor="incomplete">미완료</label>
      </div>
      <div className={styles.inputDiv}>
        <label className={styles.inputLabel} htmlFor="birth">
          출생 시기
        </label>
        <input type="month" id="birth" name="birth" />
      </div>
      <div className={styles.inputDiv}>
        <label className={styles.inputLabel} htmlFor="weight">
          몸무게
        </label>
        <input
          type="number"
          id="weight"
          name="weight"
          className={cn(styles.input, styles.weight)}
          min={1}
        />
        <span>kg</span>
      </div>
    </div>
  );
};
