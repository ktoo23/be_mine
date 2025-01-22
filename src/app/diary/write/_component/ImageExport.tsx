import { useEffect, useLayoutEffect, useState } from 'react';
import styles from './image-annotator.module.scss';
import { LuRedo2 } from 'react-icons/lu';

export function ImageExport({
  result,
  onMoveToForm,
  onStartAgain,
}: {
  result: Blob;
  onMoveToForm(result: Blob): void;
  onStartAgain(): void;
}) {
  const [src, setSrc] = useState<string | null>(null);
  useLayoutEffect(() => {
    const url = URL.createObjectURL(result);
    setSrc(url);
    return () => URL.revokeObjectURL(url);
  }, [result]);

  function onDownload() {
    if (!src) return;

    const a = document.createElement('a');
    a.href = src;
    a.download = 'annotated-image.png';
    a.click();
  }

  return (
    <div className={styles['button-wrapper']}>
      {/* <button onClick={onDownload}>Download</button> */}
      <button onClick={() => onMoveToForm(result)}>일기 작성하러 가기</button>
      <button onClick={onStartAgain}>
        <LuRedo2 /> 다시하기
      </button>
    </div>
  );
}
