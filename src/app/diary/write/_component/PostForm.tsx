'use client';
import { ChangeEventHandler, FormEventHandler, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import styles from './postForm.module.scss';
import cn from 'classnames';
import { LuUpload } from 'react-icons/lu';
import { SlPicture } from 'react-icons/sl';
import { TfiWrite } from 'react-icons/tfi';

export const PostForm = () => {
  const imageRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef(null);
  const [preview, setPreview] = useState<string | null>();

  const onUpload: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    console.log(e.target.value);
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // formData에서 textarea의 값 가져오기
    const content = formData.get('content') as string;
  };

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div className={styles.post}>
      <form onSubmit={handleSubmit}>
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
          {preview && (
            <img src={preview} alt="미리보기" onClick={onRemoveImage} />
          )}
        </div>
        <div className={styles.inputDiv}>
          <input
            type="radio"
            id="dog"
            name="species"
            value="강아지"
            defaultChecked
          />
          <label htmlFor="dog">강아지</label>

          <input type="radio" id="cat" name="species" value="고양이" />
          <label htmlFor="cat">고양이</label>
        </div>
        <div className={styles.inputDiv}>
          <label className={styles.inputLabel} htmlFor="number">
            공고번호
          </label>
          <input
            id="number"
            name="number"
            className={styles.input}
            placeholder=""
            required
          />
        </div>
        <div className={styles.inputDiv}>
          <label className={styles.inputLabel} htmlFor="content">
            오늘 일기
          </label>
          <TextareaAutosize
            id="content"
            name="content"
            className={cn(styles.input, styles.text)}
            placeholder="오늘 일기를 작성해주세요. (300자 이내)"
            required
          />
        </div>
        <div className={cn(styles.inputDiv, styles.activities)}>
          <label className={styles.inputLabel} htmlFor="activity1">
            오늘 한 일 3가지
          </label>
          <input
            id="activity1"
            name="activities"
            className={styles.input}
            placeholder="아무것도 안하기"
            required
          />
          <input
            id="activity2"
            name="activities"
            className={styles.input}
            placeholder="눕기"
            required
          />
          <input
            id="activity3"
            name="activities"
            className={styles.input}
            placeholder="앉기"
            required
          />
        </div>
        <div className={styles['button-wrapper']}>
          <button className={styles.actionButton}>일기 작성 끝</button>
        </div>
      </form>
    </div>
  );
};
