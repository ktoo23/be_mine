import { SubTitle } from '../_component/SubTitle';
import { Question } from './_component/Question';

import containerStyles from '@/app/_component/containerStyle.module.scss';
import subTitleStyles from '../_component/subTitle.module.scss';

const Page = () => {
  return (
    <>
      <div className={subTitleStyles['title-wrapper']}>
        <SubTitle title="임보 유형 테스트" />
      </div>
      <div className={containerStyles.container}>
        <Question />
      </div>
    </>
  );
};

export default Page;
