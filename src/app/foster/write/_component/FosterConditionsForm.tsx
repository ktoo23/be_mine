import TextareaAutosize from 'react-textarea-autosize';
import cn from 'classnames';

import styles from './postForm.module.scss';
import { IoPawSharp } from 'react-icons/io5';

export const FosterConditionsForm = () => {
  return (
    <div className={styles['foster-conditions']}>
      <strong>
        <IoPawSharp className={styles.icon} />
        임보 조건
      </strong>
      <div className={styles.inputDiv}>
        <label className={styles.inputLabel} htmlFor="region">
          지역
        </label>
        <input
          className={styles.input}
          id="region"
          name="region"
          type="text"
          placeholder="서울, 경기"
        />
      </div>
      <div className={styles.inputDiv}>
        <label className={styles.inputLabel} htmlFor="foster-period">
          임보 기간
        </label>
        <input
          className={styles.input}
          id="foster-period"
          name="fosterPeriod"
          type="text"
          placeholder="2개월 이상"
        />
      </div>
      <div className={styles.inputDiv}>
        <label className={styles.inputLabel} htmlFor="pickup">
          픽업
        </label>
        <input
          className={styles.input}
          id="pickup"
          name="pickup"
          type="text"
          placeholder="지원 가능/ 불가능"
        />
      </div>
      <div className={styles.inputDiv}>
        <label className={styles.inputLabel} htmlFor="additional-conditions">
          기타 조건
        </label>
        <TextareaAutosize
          id="additional-conditions"
          name="additionalConditions"
          className={cn(styles.input, styles.text)}
        />
      </div>
    </div>
  );
};
