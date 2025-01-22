import { useState } from 'react';
import {
  DEFAULT_SUPPORTED_MEDIA_TYPE_LIST,
  FileHelpers,
  MediaHelpers,
} from 'tldraw';
import styles from './image-annotator.module.scss';
import { MdOutlineCameraAlt } from 'react-icons/md';

export function ImagePicker({
  onChooseImage,
}: {
  onChooseImage(image: {
    src: string;
    width: number;
    height: number;
    type: string;
  }): void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  function onClickChooseImage() {
    const input = window.document.createElement('input');
    input.type = 'file';
    input.accept = DEFAULT_SUPPORTED_MEDIA_TYPE_LIST;
    input.addEventListener('change', async (e) => {
      const fileList = (e.target as HTMLInputElement).files;
      if (!fileList || fileList.length === 0) return;
      const file = fileList[0];

      setIsLoading(true);
      try {
        const dataUrl = await FileHelpers.blobToDataUrl(file);
        const { w, h } = await MediaHelpers.getImageSize(file);
        onChooseImage({
          src: dataUrl,
          width: w,
          height: h,
          type: file.type,
        });
      } finally {
        setIsLoading(false);
      }
    });
    input.click();
  }

  if (isLoading) {
    return <div className={styles['image-picker']}>Loading...</div>;
  }

  return (
    <div className={styles['image-picker']}>
      <p>이미지를 선택하세요</p>
      <button onClick={onClickChooseImage}>
        <MdOutlineCameraAlt className={styles.icon} />
      </button>
    </div>
  );
}
