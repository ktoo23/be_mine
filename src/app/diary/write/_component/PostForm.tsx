'use client';
import { MutableRefObject, useRef, useState } from 'react';

import styles from './postForm.module.scss';
import cn from 'classnames';

import { EditorInput } from './EditorInput';
import { Input } from './Input';
import { useMutation } from '@tanstack/react-query';
import { postDiary } from '@/lib/postDiary';
import { useRouter } from 'next/navigation';
import { Slide, toast } from 'react-toastify';
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useController,
} from 'react-hook-form';
import { SearchAnimal } from './SearchAnimal';

type FormValues = {
  title: string;
  animalInfo: { id: number; data: string };
};

type PostFormProps = {
  result: Blob;
};

export const PostForm = ({ result }: PostFormProps) => {
  const router = useRouter();
  const [editorContent, setEditorContent] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [src, setSrc] = useState<string | null>(URL.createObjectURL(result));
  const triggerRef = useRef<HTMLButtonElement>(null);

  const methods = useForm({
    defaultValues: { title: '', animalInfo: { id: -1, data: '' } },
  });
  const {
    control,
    setError,
    clearErrors,
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

  const { field } = useController({
    name: 'animalInfo', // 폼 필드 이름
    control,
  });

  // Blob 이미지 폼 제출하기 위해 File로 변환
  const convertBlobToFile = (blob: Blob, fileName: string): File => {
    return new File([blob], fileName, { type: blob.type });
  };

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    console.log(values);

    const file = convertBlobToFile(result, 'canvas-image.png');

    if (values.animalInfo.id === -1 || values.animalInfo.data === '') {
      setError('animalInfo', {
        type: 'manual',
        message: '동물 정보를 입력해주세요.',
      });
      return;
    }

    const formData = new FormData();
    formData.append('id', field.value.id.toString());
    formData.append('title', values.title);
    formData.append('content', editorContent);
    formData.append('image', file);

    await mutate(formData);
    clearErrors('animalInfo'); // 에러 초기화
  };

  const handleEditorBlur = (content: string) => {
    setEditorContent(content);
  };

  return (
    <div className={styles.post}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div
            style={{
              marginBottom: '10px',
              width: '450px',
              height: '600px',
            }}
          >
            <img
              src={src!}
              style={{
                display: 'block',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
          <div className={styles.inputDiv}>
            <div className={styles.inputLabel}>동물 정보</div>
            <div className={styles.information}>
              <div className={styles.content}>
                <p>{field.value?.data || '-'}</p>
              </div>
              <button
                ref={triggerRef}
                type="button"
                className={styles['search-button']}
                onClick={() => setIsOpen(true)}
              >
                검색
              </button>
            </div>

            {errors.animalInfo && (
              <p className={styles.message}>{errors.animalInfo.message}</p>
            )}
          </div>
          <SearchAnimal
            animalField={field}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            triggerRef={triggerRef}
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
              {isPending ? '게시 중...' : '일기 작성 끝'}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
