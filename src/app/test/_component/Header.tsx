import styles from './header.module.scss';

interface HeaderProps {
  id: string;
  text: string;
}

export const Header = ({ id, text }: HeaderProps) => {
  return (
    <div className={styles['question-header']}>
      <p>{id.toUpperCase()}</p>
      <strong>{text}</strong>
    </div>
  );
};
