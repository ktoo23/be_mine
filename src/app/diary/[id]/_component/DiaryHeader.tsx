import { User } from '@/model/User';
import styles from './header.module.scss';

interface DiaryHeaderProps {
  User: User;
  date: string;
}

const DiaryHeader = ({ User, date }: DiaryHeaderProps) => {
  return (
    <div className={styles['diary-header']}>
      <div className={styles['user-image']}>
        {User.imageUrl && <img src={User.imageUrl} alt="유저 프로필 이미지" />}
        {!User.imageUrl && (
          <img src="/images/img-user-default.png" alt="유저 프로필 이미지" />
        )}
      </div>
      <div className={styles.detail}>
        <div className={styles['user-name']}>{User.name}</div>
        <p className={styles.date}>{date}</p>
      </div>
    </div>
  );
};

export default DiaryHeader;
