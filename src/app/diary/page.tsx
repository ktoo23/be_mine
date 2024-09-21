import { SubTitle } from '../_component/SubTitle';

import containerStyles from './page.module.scss';
import styles from '@/app/_component/animalCard.module.scss';

import subTitleStyles from '../_component/subTitle.module.scss';
import { DiaryTab } from './_component/DiaryTab';
import { DiaryAnimalCard } from './_component/DiaryAnimalCard';

const DiaryAnimalsPage = () => {
  return (
    <>
      <div className={subTitleStyles['title-wrapper']}>
        <SubTitle title="임보 동물 일기" />
        <DiaryTab />
      </div>
      <div className={containerStyles.container}>
        <ul className={styles['animal-list']}>
          <li className={styles['animal-item']}>
            <DiaryAnimalCard />
          </li>
          <li className={styles['animal-item']}>
            <DiaryAnimalCard />
          </li>
          <li className={styles['animal-item']}>
            <DiaryAnimalCard />
          </li>
          <li className={styles['animal-item']}>
            <DiaryAnimalCard />
          </li>
          <li className={styles['animal-item']}>
            <DiaryAnimalCard />
          </li>
        </ul>
      </div>
    </>
  );
};

export default DiaryAnimalsPage;
