import { User } from '@/model/User';
import styles from './header.module.scss';

interface DiaryHeaderProps {
  date: string;
  weather: string;
}
const DiaryHeader = ({ date, weather }: DiaryHeaderProps) => {
  return (
    <div className={styles['diary-header']}>
      <div className={styles['user-image']}>
        <img src="/images/img-user-default.png" alt="유저 프로필 이미지" />
      </div>
      <div className={styles.detail}>
        <div className={styles['user-name']}>맞수</div>
        <p className={styles.date}>{date}</p>
      </div>
    </div>
  );
};

export default DiaryHeader;
