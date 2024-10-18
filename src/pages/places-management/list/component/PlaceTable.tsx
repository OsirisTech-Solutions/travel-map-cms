import CTable from '@/components/common/CTable';
import { useGetListCategoryQuery } from '@/redux/services/categoryApi';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { Button, Space, Tag } from 'antd';
import React from 'react';

const PlaceTable: React.FC<
  TableProps & { onEdit: (record: SCHEMA.Place) => void; onDelete: (record: SCHEMA.Place) => void }
> = ({ onEdit, onDelete, ...props }) => {
  const getListCategoryQuery = useGetListCategoryQuery({
    params: {
      limit: 100,
      page: 1,
    },
  });
  const getNameCategory = (id: string) => {
    const category = getListCategoryQuery.data?.data?.items.find((item) => item.id === id);
    return category?.name;
  };
  const columns: TableProps<SCHEMA.Place>['columns'] = [
    {
      title: 'Tên địa danh',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <div>{text}</div>,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Loại',
      dataIndex: 'categoryId',
      key: 'categoryId',
      render: (value) => {
        return <Tag color="cyan">{getNameCategory(value)}</Tag>;
      },
    },
    // {
    //   title: 'Trạng thái',
    //   dataIndex: 'status',
    //   key: 'status',
    // },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Button
            size="small"
            icon={<EditOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              onEdit(record);
            }}
          />
          <Button
            size="small"
            icon={<DeleteOutlined />}
            color="danger"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(record);
            }}
          />
        </Space>
      ),
    },
  ];
  return (
    // @ts-ignore
    <CTable<SCHEMA.Place>
      columns={columns}
      {...props}
    />
  );
};

export default PlaceTable;
