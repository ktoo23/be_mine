import { SubTitle } from '../_component/SubTitle';

import styles from './page.module.scss';
import fosterCardStyles from './_component/fosterAnimalCard.module.scss';

import subTitleStyles from '../_component/subTitle.module.scss';
import { FosterAnimalCard } from './_component/FosterAnimalCard';
import { FosterNavbar } from './_component/FosterNavbar';

const FosterAnimalsPage = () => {
  return (
    <>
      <div className={subTitleStyles['title-wrapper']}>
        <SubTitle title="임보 동물 찾기" />
        <FosterNavbar />
      </div>
      <div className={styles.container}>
        <ul className={fosterCardStyles['foster-animal-list']}>
          <li className={fosterCardStyles['foster-animal-item']}>
            <FosterAnimalCard />
          </li>
          <li className={fosterCardStyles['foster-animal-item']}>
            <FosterAnimalCard />
          </li>
          <li className={fosterCardStyles['foster-animal-item']}>
            <FosterAnimalCard />
          </li>
          <li className={fosterCardStyles['foster-animal-item']}>
            <FosterAnimalCard />
          </li>
          <li className={fosterCardStyles['foster-animal-item']}>
            <FosterAnimalCard />
          </li>
        </ul>
      </div>
    </>
  );
};

export default FosterAnimalsPage;
