import styles from './main.module.scss';
import { Image as Iimage } from '@/model/Image';
import { DiaryImage } from './Image';
import dynamic from 'next/dynamic';
import DiaryFooter from './DiaryFooter';

const DiaryContent = dynamic(
  () => import('@/app/diary/[id]/_component/DiaryContent'),
  { ssr: false },
);

interface DiaryMainProps {
  Image: Iimage;
  title: string;
  content: string;
}

const DiaryMain = ({ Image, title, content }: DiaryMainProps) => {
  return (
    <div className={styles['diary-main']}>
      <DiaryImage image={Image} />
      <div className={styles['diary-content']}>
        <div className={styles.title}>{title}</div>
        <DiaryContent content={content} />
      </div>
      <DiaryFooter />
    </div>
  );
};

export default DiaryMain;
