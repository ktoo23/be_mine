import { useEffect, useRef, useState } from 'react';
import Quill from 'quill';

import styles from './main.module.scss';

type Props = {
  content: string;
};

const DiaryContent = ({ content }: Props) => {
  const [isEmpty, setIsEmpty] = useState(false);
  const rendererRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rendererRef.current) return;

    const container = rendererRef.current;

    const quill = new Quill(document.createElement('div'), {
      theme: 'snow',
    });

    quill.enable(false);

    quill.setContents(JSON.parse(content));

    const isEmpty =
      quill
        .getText()
        .replace(/<(.|\n)*?>/g, '')
        .trim().length === 0;
    setIsEmpty(isEmpty);

    container.innerHTML = quill.root.innerHTML;

    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [content]);

  if (isEmpty) {
    return null;
  }

  return (
    <div className={styles['diary-text']}>
      <div ref={rendererRef} className="ql-editor ql-renderer" />

      <div className={styles['diary-meta']}>
        <div className={styles['meta-item']}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          소중한 기록
        </div>
        <div className={styles['meta-item']}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {new Date().toLocaleDateString()} 작성
        </div>
      </div>
    </div>
  );
};

export default DiaryContent;
