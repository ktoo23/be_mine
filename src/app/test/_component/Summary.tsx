'use client';

import cn from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import styles from './question.module.scss';
import summaryStyles from './summary.module.scss';

// 각 질문의 적합한 답변과 가중치 정의
// 가중치는 임보 적합성 평가에서 해당 질문의 중요도를 나타냄
const IDEAL_ANSWERS = [
  { id: 'q1', answer: '아니오', weight: 2 }, // 집에 있는 시간이 충분해야 함 (중요도 높음)
  { id: 'q2', answer: '네', weight: 1.5 }, // 적절한 주거 환경
  { id: 'q3', answer: '네', weight: 1 }, // 반려동물 경험
  { id: 'q4', answer: '네', weight: 1.5 }, // 가족 동의 (중요함)
  { id: 'q5', answer: '네', weight: 1.5 }, // 재정적 준비 (중요함)
  { id: 'q6', answer: '네', weight: 2 }, // 정서적 준비 (매우 중요)
  { id: 'q7', answer: '네', weight: 0.5 }, // 기존 반려동물 없음 (덜 중요)
  { id: 'q8', answer: '네', weight: 1 }, // 관리 능력
  { id: 'q9', answer: '네', weight: 1 }, // 훈련 능력
  { id: 'q10', answer: '네', weight: 2 }, // 장기 돌봄 가능성 (매우 중요)
];

// 총 가중치 계산
const TOTAL_WEIGHT = IDEAL_ANSWERS.reduce((sum, item) => sum + item.weight, 0);

// 사용자 답변 평가 함수
const calculateScore = (userAnswers: string[]) => {
  // 사용자 점수 계산
  let userScore = 0;

  IDEAL_ANSWERS.forEach((ideal, index) => {
    if (userAnswers[index] === ideal.answer) {
      userScore += ideal.weight;
    }
  });

  // 백분율 점수 계산
  const percentageScore = (userScore / TOTAL_WEIGHT) * 100;

  // 결과 반환
  if (percentageScore >= 90) {
    return {
      title: '최고에요!',
      message:
        '임보하실 때 걱정 없겠네요! 이제 아늑한 집을 필요로 하는 아이들을 찾아볼까요?',
      canAdopt: true,
      imageUrl: '/images/test_result1.png',
    };
  } else if (percentageScore >= 80) {
    return {
      title: '훌륭해요!',
      message:
        '임보에 필요한 준비가 잘 되어 있으시군요. 마음이 맞는 친구를 찾아봐요!',
      canAdopt: true,
      imageUrl: '/images/test_result2.png',
    };
  } else if (percentageScore >= 70) {
    return {
      title: '좋아요!',
      message:
        '이제 임보를 신청할 수 있어요. 따뜻한 보금자리를 만들어 줄 준비가 되셨군요!',
      canAdopt: true,
      imageUrl: '/images/test_result3.png',
    };
  } else if (percentageScore >= 60) {
    return {
      title: '괜찮아요!',
      message: '조금만 더 준비하면 완벽할 것 같아요. 임보 신청은 가능해요!',
      canAdopt: true,
      imageUrl: '/images/test_result4.png',
    };
  } else if (percentageScore >= 50) {
    return {
      title: '조금 아쉬워요.',
      message:
        '조금 더 준비가 필요해 보여요. 더 많은 준비와 계획을 세워보는 건 어떨까요?',
      canAdopt: false,
      imageUrl: '/images/test_result5.png',
    };
  } else if (percentageScore >= 40) {
    return {
      title: '으음.. 아쉬워요.',
      message:
        '아직은 준비가 부족한 것 같아요. 임보에 대해 더 많은 정보를 얻어보고, 준비를 더 해보세요.',
      canAdopt: false,
      imageUrl: '/images/test_result6.png',
    };
  } else {
    return {
      title: '같이 힘내봐요!',
      message:
        '임보를 하기에는 준비가 아직 부족해요. 더 많은 공부와 준비가 필요해 보여요.',
      canAdopt: false,
      imageUrl: '/images/test_result7.png',
    };
  }
};
export const evaluateImboSuitability = (userAnswers: string[]) => {
  return calculateScore(userAnswers);
};

export const Summary = ({ userAnswers }: { userAnswers: string[] }) => {
  const { title, message, canAdopt, imageUrl } =
    evaluateImboSuitability(userAnswers);

  return (
    <div className={styles.question}>
      <div className={summaryStyles['summary-container']}>
        <div className={summaryStyles['summary-image']}>
          <Image src={imageUrl} alt="result-image" width={150} height={150} />
        </div>
        <h2 className={summaryStyles.title}>{title}</h2>
        <p className={summaryStyles.detail}>{message}</p>
        {canAdopt ? (
          <Link
            className={cn(summaryStyles.btn, summaryStyles['is-active'])}
            href="/foster"
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
