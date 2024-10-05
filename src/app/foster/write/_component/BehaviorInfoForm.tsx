import { IoPawSharp } from 'react-icons/io5';
import styles from './postForm.module.scss';

import BEHAVIOR_DATA from '@/BehaviorData';
import { BehaviorInfoItem } from './BehaviorInfoItem';

export const BehaviorInfoForm = () => {
  return (
    <div className={styles['behavior-info']}>
      <strong>
        <IoPawSharp className={styles.icon} />
        참고용 정보
      </strong>
      {BEHAVIOR_DATA.map((item, index) => (
        <BehaviorInfoItem
          key={index}
          label={item.label}
          inputName={item.inputName}
          text1={item.text1}
          text2={item.text2}
        />
      ))}
    </div>
  );
};
