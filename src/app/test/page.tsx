import { SubTitle } from '../_component/SubTitle';
import { Question } from './_component/Question';

import styles from './test.module.scss';

const Page = () => {
  return (
    <>
      <div className={styles['title-wrapper']}>
        <SubTitle title="임보 유형 테스트" />
      </div>
      <div className={styles.container}>
        <Question />
      </div>
    </>
  );
};

export default Page;
