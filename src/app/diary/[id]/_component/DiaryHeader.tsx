import styles from './header.module.scss';

interface DiaryHeaderProps {
  date: string;
  weather: string;
}
const DiaryHeader = ({ date, weather }: DiaryHeaderProps) => {
  return (
    <div className={styles['diary-header']}>
      <p>{date}</p>
      <p>날씨 {weather}</p>
    </div>
  );
};

export default DiaryHeader;
