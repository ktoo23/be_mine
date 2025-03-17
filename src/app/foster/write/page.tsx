import containerStyles from '@/app/_component/containerStyle.module.scss';
import pageTitleStyles from '@/app/_component/pageTitle.module.scss';

import { PageTitle } from '@/app/_component/PageTitle';
import { PostForm } from './_component/PostForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '임보 게시글 작성하기 / Be mine.',
  description: '임보 게시글 작성',
};

const Page = () => {
  return (
    <>
      <div className={pageTitleStyles['title-wrapper']}>
        <PageTitle title="임보 동물 소개글 작성" />
      </div>
      <div className={containerStyles.container}>
        <PostForm />
      </div>
    </>
  );
};

export default Page;
