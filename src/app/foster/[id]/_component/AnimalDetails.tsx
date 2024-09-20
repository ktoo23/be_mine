import { AnimalDetailContent } from './AnimalDetailContent';
import { AnimalDetailHeader } from './AnimalDetailHeader';
import { AnimalDetailTable } from './AnimalDetailTable';
import { AnimalDifficulty } from './AnimalDifficulty';
import styles from './animalDetails.module.scss';

interface AnimalDetailsProps {
  title: string;
  type: string; // foster-table, health-table
}

export const AnimalDetails = ({ title, type }: AnimalDetailsProps) => {
  return (
    <section className={styles['animal-section']}>
      <AnimalDetailHeader title={title} />
      {type === 'text' && <AnimalDetailContent />}
      {type === 'difficulty' && <AnimalDifficulty />}
      {type.includes('table') && <AnimalDetailTable type={type} />}
    </section>
  );
};
