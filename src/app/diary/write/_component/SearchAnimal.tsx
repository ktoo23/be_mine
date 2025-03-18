import React, {
  Dispatch,
  SetStateAction,
  useRef,
  useState,
  useEffect,
} from 'react';
import { IoSearch } from 'react-icons/io5';
import { IoCloseSharp } from 'react-icons/io5';

import styles from './searchAnimal.module.scss';
import { useQuery } from '@tanstack/react-query';
import { getAnimals } from '@/lib/getAnimals';

interface SearchAnimalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  animalField: {
    value: { id: number; data: string };
    onChange: (value: { id: number; data: string }) => void;
  };
  triggerRef?: React.RefObject<HTMLButtonElement>;
}

export const SearchAnimal = ({
  isOpen,
  setIsOpen,
  animalField,
  triggerRef,
}: SearchAnimalProps) => {
  const [value, setValue] = useState('');
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const {
    data: animals,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['fosters', value],
    queryFn: getAnimals,
    enabled: false,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  // dialog 요소 열기/닫기 관리
  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
      // 모달이 열릴 때 input에 포커스
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleDialogClose = () => {
      setIsOpen(false);

      // 트리거 버튼으로 포커스 반환
      if (triggerRef?.current) {
        setTimeout(() => {
          triggerRef.current?.focus();
        }, 0);
      }
    };
    const dialogElement = dialogRef.current;

    dialogElement?.addEventListener('close', handleDialogClose);

    return () => {
      dialogElement?.removeEventListener('close', handleDialogClose);
    };
  }, [setIsOpen]);

  const handleSubmit = () => {
    if (!value.trim()) {
      alert('검색어를 입력해주세요.');
      return;
    }

    refetch();
  };

  return (
    <dialog ref={dialogRef} className={styles.modal}>
      <button type="button" onClick={() => setIsOpen(false)} aria-label="닫기">
        <IoCloseSharp className={styles['close-icon']} />
      </button>
      <div className={styles['modal-header']}>
        <h1>동물 검색</h1>
      </div>
      <div className={styles.search}>
        <div className={styles['input-wrapper']}>
          <input
            ref={inputRef}
            value={value}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.code === 'Enter') {
                e.preventDefault();
                handleSubmit();
              }
            }}
            type="text"
            placeholder="검색어를 입력하세요."
          />
          <button type="button" onClick={handleSubmit} aria-label="검색">
            <IoSearch className={styles.icon} />
          </button>
        </div>
      </div>
      <p className={styles.misc}>
        이름 혹은 공고번호로 검색한 후 해당 동물을 선택해주세요.
      </p>
      <div className={styles.separator}></div>
      {isLoading && <p>Loading...</p>}
      <div className={styles['modal-content']}>
        {animals?.length > 0 ? (
          animals.map((animal: any) => (
            <div
              key={animal.id}
              className={styles['search-result']}
              onClick={() => {
                const data = `${animal.name}/${animal.gender}/${animal.weight}`;
                animalField.onChange({
                  id: animal.id,
                  data,
                });
                setIsOpen(false);
              }}
              tabIndex={0}
              role="button"
              aria-label={`${animal.announcementNo} ${animal.name}/${animal.gender}/${animal.weight} 선택`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  const data = `${animal.name}/${animal.gender}/${animal.weight}`;
                  animalField.onChange({
                    id: animal.id,
                    data,
                  });
                  setIsOpen(false);
                }
              }}
            >
              <span>{animal.announcementNo}</span>
              <strong>
                {animal.name}/{animal.gender}/{animal.weight}
              </strong>
            </div>
          ))
        ) : (
          <p>검색 결과가 없어요!</p>
        )}
      </div>
    </dialog>
  );
};
