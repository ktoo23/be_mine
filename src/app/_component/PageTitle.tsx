import styles from './pageTitle.module.scss';

interface PageTitleProps {
  title: string;
}

export const PageTitle = ({ title }: PageTitleProps) => {
  return (
    <header className={styles.title}>
      <h1>{title}</h1>
    </header>
  );
};
