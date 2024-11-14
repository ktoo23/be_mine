import { Fragment, forwardRef } from 'react';
import { InfiniteData } from '@tanstack/react-query';

import containerStyles from '@/app/_component/animalList.module.scss';
import styles from '@/app/_component/animalCard.module.scss';

type InfiniteAnimalListProps<T> = {
  data: InfiniteData<T[]> | undefined;
  renderItem: (item: T) => React.ReactNode;
};

export const InfiniteAnimalList = forwardRef<
  HTMLDivElement,
  InfiniteAnimalListProps<any>
>(({ data, renderItem }, ref) => {
  return (
    <div className={containerStyles.container}>
      <ul className={styles['animal-list']}>
        {data?.pages.map((page, i) => (
          <Fragment key={i}>
            {page.map((item) => (
              <li key={(item as any).id} className={styles['animal-item']}>
                {renderItem(item)}
              </li>
            ))}
          </Fragment>
        ))}
      </ul>
      <div ref={ref} style={{ height: 50 }} />
    </div>
  );
});

InfiniteAnimalList.displayName = 'InfiniteAnimalList';
