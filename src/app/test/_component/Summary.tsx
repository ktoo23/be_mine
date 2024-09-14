'use client';

import cn from 'classnames';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import Image from 'next/image';
import QUESTIONS from '@/data';
import styles from './question.module.scss';
import summaryStyles from './summary.module.scss';

interface SummaryProps {
  userAnswers: string[];
}

const generateAnswers = () => {
  const answers = QUESTIONS.map((question) => question.answers[0]);
  return answers;
};

const calculateScore = (answers: string[], userAnswers: string[]) => {
  const userCorrectedAnswers = answers.filter(
    (answer, i) => answer === userAnswers[i],
  );

  const score = (userCorrectedAnswers.length / answers.length) * 100;

  if (score >= 90) {
    return {
      score: 'A',
      title: '최고에요!',
      message:
        '임보하실 때 걱정 없겠네요! 이제 아늑한 집을 필요로 하는 아이들을 찾아볼까요?',
    };
  } else if (score >= 85) {
    return {
      score: 'B+',
      title: '훌륭해요!',
      message:
        '임보에 필요한 준비가 잘 되어 있으시군요. 마음이 맞는 친구를 찾아봐요!',
    };
  } else if (score >= 70) {
    return {
      score: 'B',
      title: '좋아요!',
      message:
        '이제 임보를 신청할 수 있어요. 따뜻한 보금자리를 만들어 줄 준비가 되셨군요!',
    };
  } else if (score >= 60) {
    return {
      score: 'B-',
      title: '괜찮아요!',
      message: '조금만 더 준비하면 완벽할 것 같아요. 임보 신청은 가능해요!',
    };
  } else if (score >= 50) {
    return {
      score: 'C',
      title: '조금 아쉬워요.',
      message:
        '조금 더 준비가 필요해 보여요. 더 많은 준비와 계획을 세워보는 건 어떨까요?',
    };
  } else if (score >= 40) {
    return {
      score: 'D',
      title: '으음.. 아쉬워요.',
      message:
        '아직은 준비가 부족한 것 같아요. 임보에 대해 더 많은 정보를 얻어보고, 준비를 더 해보세요.',
    };
  } else {
    return {
      score: 'F',
      title: '같이 힘내봐요!',
      message:
        '임보를 하기에는 준비가 아직 부족해요. 더 많은 공부와 준비가 필요해 보여요.',
    };
  }
};

export const Summary = ({ userAnswers }: SummaryProps) => {
  const router = useRouter();

  let answers: string[] = generateAnswers();
  console.log('answers: ', answers, 'userAnswers', userAnswers);

  const { score, title, message } = calculateScore(answers, userAnswers);
  console.log(score);

  return (
    <div className={styles.question}>
      <div className={summaryStyles['summary-container']}>
        <div className={summaryStyles['summary-image']}>
          <Image
            src="/images/test_result8.png"
            alt="result-image"
            width={150}
            height={150}
          />
        </div>
        <h1 className={summaryStyles.score}>{score}</h1>
        <p className={summaryStyles.title}>{title}</p>
        <p className={summaryStyles.detail}>{message}</p>
        {score === 'A' || score === 'B+' || score === 'B-' || score === 'B' ? (
          <Link
            className={cn(summaryStyles.btn, summaryStyles['is-active'])}
            href="/"
          >
            임보 동물 찾기
          </Link>
        ) : (
          <button
            className={summaryStyles.btn}
            type="button"
            onClick={() => (window.location.href = '/test')}
          >
            다시 해보기
          </button>
        )}
      </div>
    </div>
  );
};
