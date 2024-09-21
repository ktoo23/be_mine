import Image from 'next/image';
import styles from './main.module.scss';

interface DiaryMainProps {
  content: string;
  activities: string[];
  imageUrl: string;
}

const DiaryMain = ({ content, activities, imageUrl }: DiaryMainProps) => {
  const lines: string[] = content.split('\n'); // 개행 문자로 줄 나누기

  return (
    <div className={styles['diary-main']}>
      <div className={styles['diary-image']}>
        <Image
          src={imageUrl}
          alt="동물 이미지"
          width={3}
          height={2}
          layout="responsive"
        />
      </div>
      <div className={styles['diary-content']}>
        <div className={styles['diary-txt']}>
          {lines.map((line, index) => (
            <div key={index} className={styles['diary-line']}>
              {line}
            </div>
          ))}
        </div>
        <div className={styles['diary-memo']}>
          <span>오늘 한 일들</span>
          {activities.map((activity, index) => (
            <p key={index}>{activity}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiaryMain;
