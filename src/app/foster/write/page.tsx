import containerStyles from '@/app/_component/containerStyle.module.scss';
import subTitleStyles from '@/app/_component/subTitle.module.scss';
import { SubTitle } from '@/app/_component/SubTitle';
import { PostForm } from './_component/PostForm';

const Page = () => {
  return (
    <>
      <div className={subTitleStyles['title-wrapper']}>
        <SubTitle title="임보 동물 소개글 작성" />
      </div>
      <div className={containerStyles.container}>
        <PostForm />
      </div>
    </>
  );
};

export default Page;
