'use client';
import { useState } from 'react';

import styles from './postForm.module.scss';
import cn from 'classnames';

import { EditorInput } from './EditorInput';
import { Input } from './Input';
import { UploadImage } from './UploadImage';
import { useMutation } from '@tanstack/react-query';
import { postDiary } from '@/lib/postDiary';
import { useRouter } from 'next/navigation';
import { Slide, toast } from 'react-toastify';

export const PostForm = () => {
  const router = useRouter();
  const [editorContent, setEditorContent] = useState('');

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await postDiary(formData);

      return response;
    },
    onSuccess: async (response) => {
      const newPost = await response.json();
      console.log(newPost);
      router.replace('/diary');
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // TODO: validation 작성
    formData.append('content', editorContent);

    console.log('SUBMIT', editorContent);
    mutate(formData);
  };
  const handleEditorBlur = (content: string) => {
    setEditorContent(content);
  };

  return (
    <div className={styles.post}>
      <form onSubmit={handleSubmit}>
        <UploadImage />
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
        <Input
          label="공고번호"
          id="announcement-no"
          name="announcementNo"
          className={cn(styles.input, styles['input-width'])}
        />
        <Input
          label="제목"
          id="title"
          name="title"
          placeholder="일기 제목을 작성해주세요."
          className={cn(styles.input, styles['input-width'])}
        />
        <div className={styles.inputDiv}>
          <div className={styles.inputLabel}>오늘 일기</div>
          <EditorInput onBlur={handleEditorBlur} />
        </div>
        <div className={styles['button-wrapper']}>
          <button className={styles.actionButton} disabled={isPending}>
            일기 작성 끝
          </button>
        </div>
      </form>
    </div>
  );
};
