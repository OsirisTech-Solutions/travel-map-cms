import { getPathAsset } from '@/components/common/Library/utils';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Image, Popconfirm, Space, Table, TableProps, Tag, Tooltip } from 'antd';
import React from 'react';

type CustomTableProps = TableProps & {
  onEdit?: (record: SCHEMA.Product) => void;
  onDelete?: (record: SCHEMA.Product) => void;
  pageConfig: { pageSize: number; current: number };
};

const ProductTable: React.FC<CustomTableProps> = ({ onEdit, onDelete, pageConfig, ...props }) => {
  const columns: TableProps<SCHEMA.Product>['columns'] = [
    {
      title: 'STT',
      dataIndex: 'id',
      key: 'id',
      render(value, record, index) {
        return (pageConfig.current - 1) * pageConfig.pageSize + (index + 1);
      },
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    // {
    //   title: 'Hàng trong kho',
    //   dataIndex: 'stock',
    //   key: 'stock',
    // },
    {
      title: 'Ảnh minh họa',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (value: any, record: SCHEMA.Product) => {
        console.log('record', record);
        return <Image src={ getPathAsset(record.thumbnail) } width={100} height={100} />;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          {/* <Tooltip title="Chỉnh sửa">
            <Button
              size="small"
              icon={<EditOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.(record);
              }}
            />
          </Tooltip> */}
          <Tooltip title="Xóa">
            <Popconfirm
              title="Xóa sản phẩm"
              description="Bạn có chắc chắn muốn xóa sản phẩm này không?"
              onConfirm={() => {
                onDelete?.(record);
              }}
              onCancel={() => {}}
              okText="Xóa"
              cancelText="Không"
            >
              <Button
                size="small"
                color="danger"
                className="text-red-600"
                icon={<DeleteOutlined />}
                // onClick={(e) => {
                //   e.stopPropagation();
                //   onDelete?.(record);
                // }}
              />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];
  return (
    // @ts-ignore
    <Table<SCHEMA.Product>
      columns={columns}
      {...props}
    />
  );
};

export default ProductTable;
