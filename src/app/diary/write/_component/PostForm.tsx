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
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

type FormValues = {
  announcementNo: string;
  title: string;
};

export const PostForm = () => {
  const router = useRouter();
  const [editorContent, setEditorContent] = useState('');

  const methods = useForm({ defaultValues: { announcementNo: '', title: '' } });
  const {
    formState: { errors },
  } = methods;
  const { mutate, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await postDiary(formData);

      return response;
    },
    onSuccess: async (response) => {
      const newPost = await response.json();
      console.log(newPost);
      toast.success('게시글이 업로드되었습니다!', {
        transition: Slide,
      });
      router.replace('/diary');
    },
    onError: (error) => {
      toast.error('잠시 문제가 발생했습니다. 다시 시도해주세요!', {
        transition: Slide,
      });
      console.error(error);
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    console.log(values);
    const formData = new FormData();

    formData.append('announcementNo', values.announcementNo);
    formData.append('title', values.title);
    formData.append('content', editorContent);

    mutate(formData);
  };

  const handleEditorBlur = (content: string) => {
    setEditorContent(content);
  };

  return (
    <div className={styles.post}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
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
            message="공고 번호를 입력하세요."
            errors={!!errors?.announcementNo}
          />
          <Input
            label="제목"
            id="title"
            name="title"
            placeholder="일기 제목을 작성해주세요."
            className={cn(styles.input, styles['input-width'])}
            message="제목을 입력하세요."
            errors={!!errors?.title}
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
      </FormProvider>
    </div>
  );
};
