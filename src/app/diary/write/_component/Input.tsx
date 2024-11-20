import { FieldErrors, useFormContext } from 'react-hook-form';
import styles from './postForm.module.scss';

interface Props {
  label: string;
  id: string;
  name: string;
  className: any;
  placeholder?: string;
  message?: string;
  errors: FieldErrors<Boolean>;
}

export const Input = ({
  label,
  id,
  name,
  className,
  placeholder,
  message,
  errors,
}: Props) => {
  const { register } = useFormContext();
  return (
    <div className={styles.inputDiv}>
      <label className={styles.inputLabel} htmlFor={id}>
        {label}
      </label>
      <input
        {...register(name, {
          required: message,
        })}
        id={id}
        name={name}
        className={className}
        placeholder={placeholder}
      />
      {errors && <p className={styles.message}>{message}</p>}
    </div>
  );
};
