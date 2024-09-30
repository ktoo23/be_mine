import { BehaviorInformation } from '@/model/BehaviorInformation';

import styles from './animalDifficulty.module.scss';

import detailContentStyles from './animalDetailContent.module.scss';
import { DifficultyItem } from './DifficultyItem';

type Props = {
  behavior: BehaviorInformation;
};

export const AnimalDifficulty = ({ behavior }: Props) => {
  return (
    <>
      <p className={detailContentStyles.description}>{behavior.description!}</p>
      <ul className={styles['difficulty-list']}>
        <DifficultyItem
          title="배변"
          level1Text="훈련이 필요해요"
          level5Text="잘해요"
          activeLevel={behavior.toiletTraining}
        />
        <DifficultyItem
          title="산책"
          level1Text="아직 낯설어요"
          level5Text="잘해요"
          activeLevel={behavior.walking}
        />
        <DifficultyItem
          title="분리불안"
          level1Text="없어요"
          level5Text="있어요"
          activeLevel={behavior.separationAnxiety}
        />
        <DifficultyItem
          title="짖음"
          level1Text="없어요"
          level5Text="있어요"
          activeLevel={behavior.barking}
        />
        <DifficultyItem
          title="털빠짐"
          level1Text="없어요"
          level5Text="있어요"
          activeLevel={behavior.shedding}
        />
        <DifficultyItem
          title="스킨쉽"
          level1Text="어려워요"
          level5Text="좋아요"
          activeLevel={behavior.affection}
        />
        <DifficultyItem
          title="대인"
          level1Text="무서워요"
          level5Text="좋아해요"
          activeLevel={behavior.adultFriendly}
        />
      </ul>
    </>
  );
};
