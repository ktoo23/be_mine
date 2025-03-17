import { PageTitle } from '../_component/PageTitle';
import { Question } from './_component/Question';

import containerStyles from '@/app/_component/containerStyle.module.scss';
import pageTitleStyles from '../_component/pageTitle.module.scss';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '임보 유형 테스트하기 / Be mine.',
  description: '임보 유형 테스트',
};

const Page = () => {
  return (
    <>
      <div className={pageTitleStyles['title-wrapper']}>
        <PageTitle title="임보 유형 테스트" />
      </div>
      <div className={containerStyles.container}>
        <Question />
      </div>
    </>
  );
};

export default Page;
