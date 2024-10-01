import NextImage from 'next/image';
import styles from './main.module.scss';
import { Image as Iimage } from '@/model/Image';
import { DiaryImage } from './Image';
import data from '@/data';

interface DiaryMainProps {
  Image: Iimage;
  title: string;
  content: string;
}

const DiaryMain = ({ Image, title, content }: DiaryMainProps) => {
  const lines: string[] = content.split('\n'); // 개행 문자로 줄 나누기

  return (
    <div className={styles['diary-main']}>
      <DiaryImage image={Image} />
      <div className={styles['diary-content']}>
        <div className={styles.title}>{title}</div>
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
