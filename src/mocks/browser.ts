import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

const worker = setupWorker(...handlers);
if (typeof window !== 'undefined') {
  // 프로덕션 환경에서도 MSW 활성화
  if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
    worker
      .start({
        onUnhandledRequest: 'bypass',
      })
      .catch((error) => {
        console.error('MSW 시작 오류:', error);
      });
  }
}

export default worker;
