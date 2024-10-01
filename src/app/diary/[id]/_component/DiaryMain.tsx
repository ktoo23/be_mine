import Image from 'next/image';
import styles from './main.module.scss';

interface DiaryMainProps {
  content: string;
  imageUrl: string;
}

const DiaryMain = ({ content, imageUrl }: DiaryMainProps) => {
  const lines: string[] = content.split('\n'); // 개행 문자로 줄 나누기

  return (
    <div className={styles['diary-main']}>
      <div className={styles['diary-image']}>
        <Image src={imageUrl} alt="동물 이미지" fill />
      </div>
      <div className={styles['diary-content']}>
        <div className={styles.title}>콩이랑 산책 중~</div>
        <div className={styles['diary-txt']}>
          {lines.map((line, index) => (
            <div key={index} className={styles['diary-line']}>
              {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiaryMain;
