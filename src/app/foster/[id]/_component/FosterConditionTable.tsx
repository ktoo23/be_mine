import { FosterCondition } from '@/model/FosterCondition';
import styles from './table.module.scss';

type Props = {
  content: FosterCondition;
};

export const FosterConditionTable = ({ content }: Props) => {
  return (
    <div className={styles['table-wrapper']}>
      <table>
        <tbody>
          <tr>
            <th>지역</th>
            <td>{content.region}</td>
          </tr>
          <tr>
            <th>임보 기간</th>
            <td>{content.fosterPeriod}</td>
          </tr>
          <tr>
            <th>픽업</th>
            <td>{content.pickup}</td>
          </tr>
          <tr>
            <th>기타 조건</th>
            <td>{content.additionalConditions}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
