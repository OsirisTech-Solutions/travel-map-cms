import CTable from '@/components/common/CTable';
import { getPathAsset } from '@/components/common/Library/utils';
import { useGetListCategoryQuery } from '@/redux/services/categoryApi';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import type { InputRef, TableColumnType, TableProps } from 'antd';
import { Button, Image, Input, Space, Tag, Tooltip } from 'antd';
import { FilterDropdownProps } from 'antd/es/table/interface';
import React, { useRef } from 'react';

const PlaceTable: React.FC<
  TableProps & { onEdit: (record: SCHEMA.Place) => void; onDelete: (record: SCHEMA.Place) => void }
> = ({ onEdit, onDelete, ...props }) => {
  const getListCategoryQuery = useGetListCategoryQuery({
    params: {
      limit: 100,
      page: 1,
    },
  });
  const searchInput = useRef<InputRef>(null);
  const getNameCategory = (id: string) => {
    const category = getListCategoryQuery.data?.data?.items.find((item) => item.id === id);
    return category?.name;
  };

  const handleSearch = (selectedKeys: string[], confirm: FilterDropdownProps['confirm']) => {
    confirm();
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
  };

  const getColumnSearchProps = (dataIndex: string): TableColumnType<any> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{ padding: 8 }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={'Tìm kiếm'}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            size="small"
            type="primary"
            onClick={() => {
              confirm({ closeDropdown: false });
            }}
          >
            Ok
          </Button>
          <Button
            onClick={() => {
              if (!clearFilters) return;
              handleReset(clearFilters);
              confirm({ closeDropdown: true });
            }}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });
  const columns: TableProps<SCHEMA.Place>['columns'] = [
    {
      title: 'Tên địa danh',
      dataIndex: 'name',
      key: 'name',
      width: 120,
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Ảnh thumbnail',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      width: 180,
      align: 'center',
      render: (value) => (
        <Image
          preview
          width={80}
          height={80}
          src={getPathAsset(value)}
        />
      ),
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
      filters: [
        ...(getListCategoryQuery.data?.data?.items.map((item) => ({
          text: item.name,
          value: item.id,
        })) || []),
      ],
      onFilter: (value, record) => value === record.categoryId,
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
          <Tooltip title="Chỉnh sửa">
            <Button
              size="small"
              icon={<EditOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                onEdit(record);
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
                onDelete(record);
              }}
            />
          </Tooltip>
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
