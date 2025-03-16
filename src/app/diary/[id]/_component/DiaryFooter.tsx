import styles from './main.module.scss';

const DiaryFooter = () => {
  return (
    <div className={styles['diary-footer']}>
      <div className={styles['footer-icon']}>✿</div>
      <div>임시보호 일기를 통해 소중한 추억을 남겨보세요</div>
    </div>
  );
};

export default DiaryFooter;
