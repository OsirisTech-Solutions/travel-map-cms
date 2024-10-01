import type { TableProps } from 'antd';
import { Table } from 'antd';
import { useStylish } from '../index.style';

const CTable = <T extends object>(props: TableProps<T>) => {
  const stylish = useStylish();
  return (
    <Table<T>
      className={stylish.table}
      {...props}
    />
  );
};

export default CTable;
