'use client';

import { MutableRefObject, useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import styles from '../test.module.scss';

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
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  useEffect(() => {
    // 클라이언트 측에서만 실행
    const shuffleArray = (array: any) => {
      return array.sort(() => Math.random() - 0.5);
    };

    // 초기 로드 시 answers를 무작위로 섞어 state에 저장
    setShuffledAnswers(shuffleArray([...answers]));
  }, [answers]); // answers가 변경될 때마다 셔플링 수행

  return (
    <ol className={styles['answer-list']}>
      {shuffledAnswers.map((answer) => (
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
