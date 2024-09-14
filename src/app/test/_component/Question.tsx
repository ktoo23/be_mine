'use client';

import { useState } from 'react';

import styles from './question.module.scss';
import QUESTIONS from '@/data';
import { Header } from './Header';
import { Pagination } from './Pagination';
import { Answers } from './Answers';
import { Summary } from './Summary';

export const Question = () => {
  const [userAnswers, setUserAnsweres] = useState<string[]>([]);

  const [activeQuestionIndex, setActiveQuestionIndex] = useState(
    userAnswers.length,
  );
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = (
    e: React.MouseEvent<HTMLButtonElement>,
    selectedAnswer: string,
  ) => {
    e.preventDefault();

    if (userAnswers.length === activeQuestionIndex) {
      setUserAnsweres((prevState) => {
        return [...prevState, selectedAnswer];
      });
    } else {
      setUserAnsweres((prevState) => {
        const answers = [...prevState];
        answers[activeQuestionIndex] = selectedAnswer;
        return answers;
      });
    }
    setActiveQuestionIndex((prevState) => prevState + 1);
  };

  const handleNext = () => {
    if (userAnswers.length === activeQuestionIndex) {
      setUserAnsweres((prevState) => {
        return [...prevState, ''];
      });
    }
    setActiveQuestionIndex((prevState) => prevState + 1);
  };

  const handlePrevious = () => {
    if (activeQuestionIndex > 0) {
      setActiveQuestionIndex((prevState) => prevState - 1);
    }
  };

  if (quizIsComplete) {
    return <Summary userAnswers={userAnswers} />;
  }

  return (
    <div className={styles.question}>
      <Header
        id={QUESTIONS[activeQuestionIndex].id}
        text={QUESTIONS[activeQuestionIndex].text}
      />
      <Answers
        answers={QUESTIONS[activeQuestionIndex].answers}
        selectedAnswers={userAnswers}
        index={activeQuestionIndex}
        onSelect={handleSelectAnswer}
      />
      <Pagination
        currentPage={activeQuestionIndex}
        totalPages={QUESTIONS.length}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </div>
  );
};
