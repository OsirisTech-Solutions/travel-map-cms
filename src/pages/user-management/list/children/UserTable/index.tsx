import { UserStatus } from '@/utils/constant';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Space, Table, TableProps, Tag, Tooltip } from 'antd';
import React from 'react';
type CustomTableProps = TableProps & {
  onEdit?: (record: SCHEMA.User) => void;
  onDelete?: (record: SCHEMA.User) => void;
};
const UserTable: React.FC<CustomTableProps> = ({ onEdit, onDelete, ...props }) => {
  const columns: TableProps<SCHEMA.User>['columns'] = [
    {
      title: 'Tên',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (value: any) => {
        switch (value) {
          case UserStatus.ACTIVE:
            return <Tag color="green">Hoạt động</Tag>;
          case UserStatus.BLOCK:
            return <Tag color="red">Khóa</Tag>;
          default:
            return <Tag color="gray">Không xác định</Tag>;
        }
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Chỉnh sửa">
            <Button
              size="small"
              icon={<EditOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.(record);
              }}
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button
              size="small"
              color="danger"
              className="text-red-600"
              icon={<DeleteOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(record);
              }}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];
  return (
    // @ts-ignore
    <Table<SCHEMA.User>
      columns={columns}
      {...props}
    />
  );
};

export default UserTable;
