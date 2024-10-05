import commonStyles from './postForm.module.scss';
import styles from './behaviorInfo.module.scss';
type Props = {
  label: string;
  inputName: string;
  text1: string;
  text2: string;
};

export const BehaviorInfoItem = ({ label, inputName, text1, text2 }: Props) => {
  return (
    <div className={commonStyles.inputDiv}>
      <label className={commonStyles.inputLabel}>{label}</label>
      <div className={styles.radioGroup}>
        <span className={styles['level1Text']}>{text1}</span>
        <div className={styles.radioWrapper}>
          {[1, 2, 3, 4, 5].map((value) => (
            <label key={value}>
              <input
                type="radio"
                name={inputName}
                value={value}
                className={styles[`size-${value}`]}
              />
            </label>
          ))}
        </div>
        <span className={styles['level2Text']}>{text2}</span>
      </div>
    </div>
  );
};
