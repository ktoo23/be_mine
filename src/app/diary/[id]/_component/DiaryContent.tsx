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
    <div className={styles['diary-txt']}>
      <div ref={rendererRef} className="ql-editor ql-renderer" />
    </div>
  );
};

export default DiaryContent;
