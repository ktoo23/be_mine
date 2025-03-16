import { useLayoutEffect, useState } from 'react';
import styles from './image-annotator.module.scss';
import { LuRedo2 } from 'react-icons/lu';
import Image from 'next/image';

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

  // 이미지 다운로드
  function onDownload() {
    if (!src) return;

    const a = document.createElement('a');
    a.href = src;
    a.download = 'annotated-image.png';
    a.click();
  }

  return (
    <div>
      <div className={styles['button-wrapper']}>
        <button onClick={() => onMoveToForm(result)}>일기 작성하러 가기</button>
        <button onClick={onStartAgain}>
          <LuRedo2 /> 다시하기
        </button>
      </div>
      {src && (
        <Image
          src={src}
          width={700}
          height={600}
          alt="커스텀 이미지"
          style={{ objectFit: 'contain' }}
        ></Image>
      )}
    </div>
  );
}
