import Image from 'next/image';
import styles from './footer.module.scss';

const DiaryFooter = () => {
  return (
    <div className={styles['diary-footer']}>
      <Image
        alt="도장 이미지"
        src="/images/stamp.png"
        width={100}
        height={100}
      />
    </div>
  );
};

export default DiaryFooter;
