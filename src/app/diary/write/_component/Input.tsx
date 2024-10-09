import styles from './postForm.module.scss';

interface Props {
  label: string;
  id: string;
  name: string;
  className: any;
  placeholder?: string;
}

export const Input = ({ label, id, name, className, placeholder }: Props) => {
  return (
    <div className={styles.inputDiv}>
      <label className={styles.inputLabel} htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        className={className}
        placeholder={placeholder}
      />
    </div>
  );
};
