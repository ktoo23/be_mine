import containerStyles from '@/app/_component/containerStyle.module.scss';
import pageTitleStyles from '@/app/_component/pageTitle.module.scss';
import { PageTitle } from '@/app/_component/PageTitle';
import ImageAnnotatorWrapper from './_component/ImageAnnotatorWrapper';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '임보 일기 작성하기 / Be mine.',
  description: '임보 일기 작성',
};

const Page = () => {
  return (
    <>
      <div className={pageTitleStyles['title-wrapper']}>
        <PageTitle title="임보 일기 작성" />
      </div>
      <div className={containerStyles.container}>
        <ImageAnnotatorWrapper />
      </div>
    </>
  );
};

export default Page;
