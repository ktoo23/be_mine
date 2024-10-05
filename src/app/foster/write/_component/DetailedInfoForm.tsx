import { IoPawSharp } from 'react-icons/io5';
import cn from 'classnames';
import TextareaAutosize from 'react-textarea-autosize';

import styles from './postForm.module.scss';

export const DetailedInfoForm = () => {
  return (
    <div className={styles['animal-details']}>
      <strong>
        <IoPawSharp className={styles.icon} />
        소개
      </strong>
      <div className={styles.inputDiv}>
        <label className={styles.inputLabel} htmlFor="rescue-story">
          구조 사연
        </label>
        <TextareaAutosize
          id="rescue-story"
          name="rescueStory"
          className={cn(styles.input, styles.text)}
        />
      </div>
      <div className={styles.inputDiv}>
        <label className={styles.inputLabel} htmlFor="personality-traits">
          성격 및 특징
        </label>
        <TextareaAutosize
          id="personality-traits"
          name="personalityTraits"
          className={cn(styles.input, styles.text)}
        />
      </div>
    </div>
  );
};
