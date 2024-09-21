import { SubTitle } from '../_component/SubTitle';

import containerStyles from './page.module.scss';
import styles from '@/app/_component/animalCard.module.scss';

import subTitleStyles from '../_component/subTitle.module.scss';
import { FosterAnimalCard } from './_component/FosterAnimalCard';
import { FosterTab } from './_component/FosterTab';

const FosterAnimalsPage = () => {
  return (
    <>
      <div className={subTitleStyles['title-wrapper']}>
        <SubTitle title="임보 동물 찾기" />
        <FosterTab />
      </div>
      <div className={containerStyles.container}>
        <ul className={styles['animal-list']}>
          <li className={styles['animal-item']}>
            <FosterAnimalCard />
          </li>
          <li className={styles['animal-item']}>
            <FosterAnimalCard />
          </li>
          <li className={styles['animal-item']}>
            <FosterAnimalCard />
          </li>
          <li className={styles['animal-item']}>
            <FosterAnimalCard />
          </li>
          <li className={styles['animal-item']}>
            <FosterAnimalCard />
          </li>
        </ul>
      </div>
    </>
  );
};

export default FosterAnimalsPage;
