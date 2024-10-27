import { useGetListHomeDataQuery } from '@/redux/services/homeApi'
import { Card, Table } from 'antd'
import { TableProps } from 'antd/lib'
import React from 'react'

const PAGE_SIZE = 10
const List = () => {
  const [page, setPage] = React.useState(1)
  const getListHomeDataQuery = useGetListHomeDataQuery({
    params: {
      page,
      limit: PAGE_SIZE
    }
  })
  const columns: TableProps<SCHEMA.HomeData>['columns'] = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'Loại',
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: 'Vị trí',
      dataIndex: 'position',
      key: 'position'
    },
    {
      title: "Hiển thị",
      dataIndex: "visible",
      key: "visible",
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      key: 'action'
    }
  ]
  return (
    <>
      <Card title='Danh sách dữ liệu trang chủ'>
        <Table columns={columns} dataSource={getListHomeDataQuery?.data?.data?.items}
          pagination={{
            showSizeChanger: false,
            total: getListHomeDataQuery?.data?.data?.total,
            pageSize: PAGE_SIZE,
            onChange: (page) => {
              setPage(page)
            }
          }}
        />
      </Card>
    </>
  )
}

export default List