import { BehaviorInformation } from '@/model/BehaviorInformation';

import styles from './animalDifficulty.module.scss';

import detailContentStyles from './animalDetailContent.module.scss';
import { DifficultyItem } from './DifficultyItem';

type Props = {
  behavior: BehaviorInformation;
};

export const AnimalDifficulty = ({ behavior }: Props) => {
  const difficultyData = [
    {
      title: '배변',
      level1Text: '훈련이 필요해요',
      level5Text: '잘해요',
      activeLevel: behavior.toiletTraining,
    },
    {
      title: '산책',
      level1Text: '아직 낯설어요',
      level5Text: '잘해요',
      activeLevel: behavior.walking,
    },
    {
      title: '분리불안',
      level1Text: '없어요',
      level5Text: '있어요',
      activeLevel: behavior.separationAnxiety,
    },
    {
      title: '짖음',
      level1Text: '없어요',
      level5Text: '있어요',
      activeLevel: behavior.barking,
    },
    {
      title: '털빠짐',
      level1Text: '없어요',
      level5Text: '있어요',
      activeLevel: behavior.shedding,
    },
    {
      title: '스킨쉽',
      level1Text: '어려워요',
      level5Text: '좋아요',
      activeLevel: behavior.affection,
    },
    {
      title: '대인',
      level1Text: '무서워요',
      level5Text: '좋아해요',
      activeLevel: behavior.adultFriendly,
    },
  ];

  return (
    <>
      <p className={detailContentStyles.description}>{behavior.description!}</p>
      <ul className={styles['difficulty-list']}>
        {difficultyData.map((item, index) => (
          <DifficultyItem
            key={index}
            title={item.title}
            level1Text={item.level1Text}
            level5Text={item.level5Text}
            activeLevel={item.activeLevel}
          />
        ))}
      </ul>
    </>
  );
};
