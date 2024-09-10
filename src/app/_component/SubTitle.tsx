import styles from './subTitle.module.scss';

interface SubTitleProps {
  title: string;
}

export const SubTitle = ({ title }: SubTitleProps) => {
  return (
    <header className={styles.title}>
      <h1>{title}</h1>
    </header>
  );
};
