import { FosterCondition } from '@/model/FosterCondition';
import { Table } from './Table';

type Props = {
  content: FosterCondition;
};

export const FosterConditionTable = ({ content }: Props) => {
  const rows = [
    { label: '지역', value: content.region },
    { label: '임보 기간', value: content.fosterPeriod },
    { label: '픽업', value: content.pickup },
    { label: '기타 조건', value: content.additionalConditions },
  ];

  return <Table rows={rows} />;
};
