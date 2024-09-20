import styles from './animalDetailTable.module.scss';

interface AnimalDetailTableProps {
  type: string;
}

export const AnimalDetailTable = ({ type }: AnimalDetailTableProps) => {
  if (type === 'foster-table') {
    return (
      <div className={styles['table-wrapper']}>
        <table>
          <tbody>
            <tr>
              <th>접종 현황</th>
              <td>접종 완료</td>
            </tr>
            <tr>
              <th>검사 현황</th>
              <td>음성</td>
            </tr>
            <tr>
              <th>병력 사항</th>
              <td>건강함</td>
            </tr>
            <tr>
              <th>기타 사항</th>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <div className={styles['table-wrapper']}>
      <table>
        <tbody>
          <tr>
            <th>지역</th>
            <td>전국</td>
          </tr>
          <tr>
            <th>임보 기간</th>
            <td>3개월 이상</td>
          </tr>
          <tr>
            <th>픽업</th>
            <td>지원가능</td>
          </tr>
          <tr>
            <th>기타 조건</th>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
