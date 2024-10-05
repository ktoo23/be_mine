import { IoPawSharp } from 'react-icons/io5';
import styles from './postForm.module.scss';

export const HealthInfoForm = () => {
  return (
    <div className={styles['health-info']}>
      <strong>
        <IoPawSharp className={styles.icon} />
        건강 정보
      </strong>
      <div className={styles.inputDiv}>
        <label className={styles.inputLabel} htmlFor="vaccination-status">
          접종 현황
        </label>
        <input
          className={styles.input}
          id="vaccination-status"
          name="vaccinationStatus"
          type="text"
        />
      </div>
      <div className={styles.inputDiv}>
        <label className={styles.inputLabel} htmlFor="test-status">
          검사 현황
        </label>
        <input
          className={styles.input}
          id="test-status"
          name="testStatus"
          type="text"
        />
      </div>
      <div className={styles.inputDiv}>
        <label className={styles.inputLabel} htmlFor="medical-history">
          병력 사항
        </label>
        <input
          className={styles.input}
          id="medical-history"
          name="medicalHistory"
          type="text"
        />
      </div>
    </div>
  );
};
