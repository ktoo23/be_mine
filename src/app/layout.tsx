import type { Metadata } from 'next';
import localFont from 'next/font/local';

import './normalize.css';
import './reset.css';
import '../styles/globals.scss';
import { GlobalNavbar } from './_component/GlobalNavbar';
import { LocalNavbar } from './_component/LocalNavbar';
import { MSWComponent } from './_component/MSWComponent';
import Providers from './_component/Providers';
import RQProvider from './_component/RQProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'Be mine! 내 가족이 되.',
  description: 'Be mine inspired pimfyvirus.com',
  icons: {
    icon: '/cat-pokeball.ico',
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="kr" className={`${pretendard.variable}`}>
      <body className={pretendard.className}>
        <MSWComponent />
        <Providers>
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <GlobalNavbar />
          <LocalNavbar />
          <RQProvider>
            {children}
            {modal}
          </RQProvider>
        </Providers>
      </body>
    </html>
  );
}
