import Image from 'next/image';

import styles from './page.module.scss';
export default function Home() {
  return (
    <div>
      <Image
        src="https://nextjs.org/icons/next.svg"
        alt="Next.js logo"
        width={180}
        height={38}
        priority
      />
    </div>
  );
}
