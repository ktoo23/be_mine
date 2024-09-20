import detailContentStyles from './animalDetailContent.module.scss';
import styles from './animalDifficulty.module.scss';

interface DifficultyItemProps {
  title: string;
  level1Text: string;
  level5Text: string;
  activeLevel: number;
}

const levels = [1, 2, 3, 4, 5];
export const DifficultyItem = ({
  title,
  level1Text,
  level5Text,
  activeLevel,
}: DifficultyItemProps) => {
  return (
    <li className={styles['difficulty-item']}>
      <strong className={detailContentStyles.title}>{title}</strong>
      <div className={styles['difficulty-level']}>
        <span>{level1Text}</span>
        <div className={styles['level-wrapper']}>
          {levels.map((level) => (
            <p
              key={level}
              className={level === activeLevel ? styles['is-active'] : ''}
            >
              {level}
            </p>
          ))}
        </div>
        <span>{level5Text}</span>
      </div>
    </li>
  );
};
