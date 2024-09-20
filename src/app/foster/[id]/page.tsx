import { AnimalDetails } from './_component/AnimalDetails';
import { AnimalInfo } from './_component/AnimalInfo';
import styles from './page.module.scss';
import { ImageSlider } from './_component/ImageSlider';

const FosterDetail = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <ImageSlider />
        <AnimalInfo />
        <div className={styles['section-wrapper']}>
          <AnimalDetails title="소개" type="text" />
          <AnimalDetails title="임보 조건" type="foster-table" />
          <AnimalDetails title="건강 정보" type="health-table" />
          <AnimalDetails title="저에 대한 정보에용" type="difficulty" />
        </div>
      </div>
    </div>
  );
};

export default FosterDetail;
