import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
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
}

export const SearchAnimal = ({
  isOpen,
  setIsOpen,
  animalField,
}: SearchAnimalProps) => {
  const [value, setValue] = useState('');

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

  const handleSubmit = () => {
    if (!value.trim()) {
      alert('검색어를 입력해주세요.');
      return;
    }

    refetch();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <button type="button" onClick={() => setIsOpen(false)}>
            <IoCloseSharp className={styles['close-icon']} />
          </button>
          <div className={styles['modal-header']}>
            <h1>동물 검색</h1>
          </div>
          <div className={styles.search}>
            <div className={styles['input-wrapper']}>
              <input
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
              <button type="button" onClick={handleSubmit}>
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
        </div>
      </div>
    </>
  );
};
