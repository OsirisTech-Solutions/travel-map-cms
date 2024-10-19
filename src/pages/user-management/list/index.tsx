import { useGetListUserQuery } from '@/redux/services/userApi';
import { Card } from 'antd';
import React from 'react';
import UserTable from './children/UserTable';

const PAGE_SIZE = 10;
const List = () => {
  const [page, setPage] = React.useState(1);
  const getListUserQuery = useGetListUserQuery({
    params: {
      limit: 10,
      page: 1,
    },
  });
  return (
    <Card size="small">
      <UserTable
        dataSource={getListUserQuery?.data?.data?.items}
        loading={getListUserQuery?.isFetching}
        rowKey={'id'}
        pagination={{
          current: page,
          pageSize: PAGE_SIZE,
          showSizeChanger: false,
          total: getListUserQuery?.data?.data?.total,
          onChange: (page) => {
            setPage(page);
          },
        }}
      />
    </Card>
  );
};

export default List;
