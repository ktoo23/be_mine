'use client';

import { ChangeEventHandler, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Slide, toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';

import styles from './postForm.module.scss';

import { postFoster } from '@/lib/postFosters';
import { AnimalInfoForm } from './AnimalInfoForm';
import { FosterConditionsForm } from './FosterConditionsForm';
import { HealthInfoForm } from './HealthInfoForm';
import { BehaviorInfoForm } from './BehaviorInfoForm';
import { DetailedInfoForm } from './DetailedInfoForm';

export const PostForm = () => {
  const imageRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<
    Array<{ dataUrl: string; file: File } | null>
  >([]);
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await postFoster(formData);

      return response;
    },
    onSuccess: async (response) => {
      setPreview([]);
      const newPost = await response.json();
      console.log(newPost);
      router.replace('/foster');
      toast.success('🦄 게시글이 업로드되었습니다!', {
        transition: Slide,
      });
    },
    onError: (error) => {
      console.error(error);
      toast.error('업로드 중 에러가 발생했습니다.', {
        transition: Slide,
      });
    },
  });

  const onUpload: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    if (e.target.files) {
      if (e.target.files.length > 3) {
        alert('최대 3개의 파일만 선택 가능합니다.');
        return;
      }

      Array.from(e.target.files).forEach((file, index) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview((prevPreview) => {
            const prev = [...prevPreview];
            prev[index] = {
              dataUrl: reader.result as string,
              file,
            };
            return prev;
          });
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const onClickButton = () => {
    imageRef.current?.click();
  };

  const onRemoveImage = (index: number) => () => {
    setPreview((prevPreview) => {
      const prev = [...prevPreview];
      prev[index] = null;
      return prev;
    });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (preview.length === 0) {
      alert('이미지를 업로드 해주세요.');
      return;
    }
    preview.forEach((p) => {
      p && formData.append('images', p.file);
    });

    mutate(formData);
  };

  return (
    <div className={styles.post}>
      <form onSubmit={onSubmit}>
        <div className={styles['upload-image-wrapper']}>
          <button
            className={styles.uploadButton}
            type="button"
            onClick={onClickButton}
          >
            사진 업로드(3장 이내)
          </button>
          <p className={styles.misc}>*이미지를 클릭하면 삭제됩니다.</p>
          <input
            id="image"
            name="image"
            multiple
            hidden
            ref={imageRef}
            onChange={onUpload}
            className={styles.input}
            type="file"
            accept="image/*"
          />
          <div className={styles['image-box']}>
            {preview.map(
              (v, index) =>
                v && (
                  <div
                    key={index}
                    className={styles['preview-image']}
                    onClick={onRemoveImage(index)}
                  >
                    <img src={v.dataUrl} alt="미리보기" />
                  </div>
                ),
            )}
          </div>
        </div>
        <AnimalInfoForm />
        <DetailedInfoForm />
        <FosterConditionsForm />
        <HealthInfoForm />
        <BehaviorInfoForm />
        <div className={styles['button-wrapper']}>
          <button className={styles.actionButton} disabled={isPending}>
            {isPending ? '게시중...' : '게시하기'}
          </button>
        </div>
      </form>
    </div>
  );
};
