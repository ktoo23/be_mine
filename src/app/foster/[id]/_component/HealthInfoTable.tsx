import { HealthInformation } from '@/model/HealthInformation';
import { Table } from './Table';

type Props = {
  content: HealthInformation;
};

export const HealthInfoTable = ({ content }: Props) => {
  const rows = [
    { label: '접종 현황', value: content.vaccinationStatus },
    { label: '검사 현황', value: content.testStatus },
    { label: '병력 사항', value: content.medicalHistory },
    { label: '기타 사항', value: '' }, // 값이 없는 경우 빈 문자열을 전달
  ];
  return <Table rows={rows} />;
};
