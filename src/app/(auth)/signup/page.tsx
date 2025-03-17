import { SignupModal } from '@/app/_component/SignupModal';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '회원가입하기 / Be mine.',
  description: '회원가입',
};

const Page = () => {
  return <SignupModal />;
};

export default Page;
