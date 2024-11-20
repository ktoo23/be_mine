import { ChangeEventHandler, useRef, useState } from 'react';
import styles from './postForm.module.scss';

export const UploadImage = () => {
  const imageRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>();

  const onUpload: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    const file = (e.target.files as FileList)[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreview(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const onClickButton = () => {
    imageRef.current?.click();
  };

  const onRemoveImage = () => {
    setPreview(null);
  };

  return (
    <div className={styles['upload-image-wrapper']}>
      <button
        className={styles.uploadButton}
        type="button"
        onClick={onClickButton}
      >
        사진 업로드 (1장)
      </button>
      <p className={styles.misc}>*이미지를 클릭하면 삭제됩니다.</p>
      <input
        id="image"
        name="image"
        hidden
        ref={imageRef}
        onChange={onUpload}
        className={styles.input}
        type="file"
        accept="image/*"
      />
      {preview && <img src={preview} alt="미리보기" onClick={onRemoveImage} />}
    </div>
  );
};
