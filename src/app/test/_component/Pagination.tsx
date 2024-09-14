'use client';

import { RiArrowDropLeftLine, RiArrowDropRightLine } from 'react-icons/ri';

import styles from './pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrevious: () => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onNext,
  onPrevious,
}: PaginationProps) => {
  const progressbarWidth = ((currentPage + 1) / totalPages) * 100; // 백분율로 너비 계산

  return (
    <div className={styles['pagination-wrapper']}>
      <button
        type="button"
        onClick={onPrevious}
        disabled={currentPage + 1 === 1}
      >
        <RiArrowDropLeftLine className={styles['arrow-icon']} />
      </button>
      <span>{currentPage + 1}</span>
      <div className={styles['pagination-progressbar']}>
        <div
          className={styles['pagination-progressbar-fill']}
          style={{
            width: `${progressbarWidth}%`, // width 속성을 사용하여 진행률 적용
            transition: 'width 500ms ease-in-out',
          }}
        ></div>
      </div>
      <span className={styles.disabled}>{totalPages}</span>
      <button
        type="button"
        onClick={onNext}
        disabled={currentPage + 1 === totalPages}
      >
        <RiArrowDropRightLine className={styles['arrow-icon']} />
      </button>
    </div>
  );
};
