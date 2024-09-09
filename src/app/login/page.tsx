'use client';

import { useRouter } from 'next/navigation';
import { Main } from '../_component/Main';

const Login = () => {
  const router = useRouter();

  router.replace('/auth/login');

  return <Main />;
};

export default Login;
