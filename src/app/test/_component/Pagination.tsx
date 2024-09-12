import { RiArrowDropLeftLine, RiArrowDropRightLine } from 'react-icons/ri';

import styles from '../test.module.scss';

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
  return (
    <div className={styles['page-wrapper']}>
      <button
        type="button"
        onClick={onPrevious}
        disabled={currentPage + 1 === 1}
      >
        <RiArrowDropLeftLine className={styles['arrow-icon']} />
      </button>
      <span>{currentPage + 1}</span>
      <progress></progress>
      <span>{totalPages}</span>
      <button type="button" onClick={onNext}>
        <RiArrowDropRightLine className={styles['arrow-icon']} />
      </button>
    </div>
  );
};
