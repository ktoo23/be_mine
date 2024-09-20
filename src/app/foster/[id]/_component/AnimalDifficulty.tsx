import styles from './animalDifficulty.module.scss';
import detailContentStyles from './animalDetailContent.module.scss';
import { DifficultyItem } from './DifficultyItem';

export const AnimalDifficulty = () => {
  return (
    <>
      <p className={detailContentStyles.description}>
        현재까지 파악된 정보에요. 다만 보호소에서는 성향을 정확히 파악하기
        어렵고, 환경과 보호자에 따라 행동은 바뀔 수 있으니 참고용으로만
        봐주세요. 적절한 애정과 훈련이 갖춰진다면 모두 훌륭한 개가 될 수
        있습니다.
      </p>
      <ul className={styles['difficulty-list']}>
        <DifficultyItem
          title="배변"
          level1Text="훈련이 필요해요"
          level5Text="잘해요"
          activeLevel={1}
        />
        <DifficultyItem
          title="산책"
          level1Text="아직 낯설어요"
          level5Text="잘해요"
          activeLevel={4}
        />
        <DifficultyItem
          title="분리불안"
          level1Text="없어요"
          level5Text="있어요"
          activeLevel={4}
        />
        <DifficultyItem
          title="짖음"
          level1Text="없어요"
          level5Text="있어요"
          activeLevel={3}
        />
        <DifficultyItem
          title="털빠짐"
          level1Text="없어요"
          level5Text="있어요"
          activeLevel={4}
        />
        <DifficultyItem
          title="대인"
          level1Text="무서워요"
          level5Text="좋아해요"
          activeLevel={2}
        />
      </ul>
    </>
  );
};
