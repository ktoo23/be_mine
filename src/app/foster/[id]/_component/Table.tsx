import styles from './table.module.scss';

type TableRow = {
  label: string;
  value?: string;
};

type TableProps = {
  rows: TableRow[];
};

export const Table = ({ rows }: TableProps) => {
  return (
    <div className={styles['table-wrapper']}>
      <table>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <th>{row.label}</th>
              <td>{row.value || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
