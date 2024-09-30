import { BehaviorInformation } from '@/model/BehaviorInformation';
import { FosterCondition } from '@/model/FosterCondition';
import { HealthInformation } from '@/model/HealthInformation';
import { DetailedInformation } from '@/model/DetailedInformation';

import styles from './animalDetails.module.scss';

import { AnimalDetailContent } from './AnimalDetailContent';
import { AnimalDetailHeader } from './AnimalDetailHeader';
import { AnimalDifficulty } from './AnimalDifficulty';
import { FosterConditionTable } from './FosterConditionTable';
import { HealthInfoTable } from './HealthInfoTable';

type contentType =
  | BehaviorInformation
  | FosterCondition
  | HealthInformation
  | DetailedInformation;

type AnimalDetailsProps<T> = {
  title: string;
  type: string;
  content: T;
};

export const AnimalDetails = <T extends contentType>({
  title,
  type,
  content,
}: AnimalDetailsProps<T>) => {
  return (
    <section className={styles['animal-section']}>
      <AnimalDetailHeader title={title} />
      {type === 'detail' && (
        <AnimalDetailContent detail={content as DetailedInformation} />
      )}
      {type === 'behavior' && (
        <AnimalDifficulty behavior={content as BehaviorInformation} />
      )}
      {type === 'foster' && (
        <FosterConditionTable content={content as FosterCondition} />
      )}
      {type === 'health' && (
        <HealthInfoTable content={content as HealthInformation} />
      )}
    </section>
  );
};
