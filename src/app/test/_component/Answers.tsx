'use client';
import cn from 'classnames';

import styles from './answers.module.scss';

interface AnswersProps {
  answers: string[];
  selectedAnswers: string[];
  index: number;
  onSelect: (
    e: React.MouseEvent<HTMLButtonElement>,
    selectedAnswer: string,
  ) => void;
}

export const Answers = ({
  answers,
  selectedAnswers,
  index,
  onSelect,
}: AnswersProps) => {
  return (
    <ol className={styles['answer-list']}>
      {answers.map((answer) => (
        <li
          key={answer}
          className={
            selectedAnswers[index] === answer
              ? cn(styles['answer-item'], styles['is-active'])
              : styles['answer-item']
          }
        >
          <button type="button" onClick={(e) => onSelect(e, answer)}>
            {answer}
          </button>
        </li>
      ))}
    </ol>
  );
};
