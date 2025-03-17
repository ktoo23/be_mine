import { LoginModal } from '@/app/_component/LoginModal';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '로그인하기 / Be mine.',
  description: '로그인',
};

const Page = () => {
  return (
    <>
      <LoginModal />
    </>
  );
};

export default Page;
