import { HealthInformation } from '@/model/HealthInformation';
import styles from './table.module.scss';

type Props = {
  content: HealthInformation;
};

export const HealthInfoTable = ({ content }: Props) => {
  return (
    <div className={styles['table-wrapper']}>
      <table>
        <tbody>
          <tr>
            <th>접종 현황</th>
            <td>{content.vaccinationStatus}</td>
          </tr>
          <tr>
            <th>검사 현황</th>
            <td>{content.testStatus}</td>
          </tr>
          <tr>
            <th>병력 사항</th>
            <td>{content.medicalHistory}</td>
          </tr>
          <tr>
            <th>기타 사항</th>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
