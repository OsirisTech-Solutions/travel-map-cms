import { useDeleleHomeDataByIdMutation, useGetListHomeDataQuery } from '@/redux/services/homeApi';
import { homeLineTitle, HomeLineType } from '@/utils/constant';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate } from '@umijs/max';
import { Button, Card, Input, InputRef, Modal, Space, Table, TableColumnType, Tag, Tooltip } from 'antd';
import { FilterDropdownProps } from 'antd/es/table/interface';
import { TableProps } from 'antd/lib';
import React, { useRef } from 'react';

const PAGE_SIZE = 10;
const List = () => {
  const [page, setPage] = React.useState(1);
  const navigate = useNavigate();

  const getListHomeDataQuery = useGetListHomeDataQuery({
    params: {
      page,
      limit: PAGE_SIZE,
      sortBy: 'DESC_POSITION',
    },
  });
  const [deleleHomeDataByIdMutation] = useDeleleHomeDataByIdMutation();

  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
  ) => {
    confirm();
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
  };

  const getColumnSearchProps = (dataIndex: string): TableColumnType<any> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
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
            type='primary'
            onClick={() => {
              confirm({ closeDropdown: false });
            }}
          >
            Ok
          </Button>
          <Button
            onClick={() => {
              if (!clearFilters) return;
              handleReset(clearFilters)
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

  const onEdit = (record: SCHEMA.HomeData) => {
    navigate(`/home-management/edit/${record.id}`);
  };
  const onCreate = () => {
    navigate('/home-management/create');
  };
  const onDelete = (record: SCHEMA.HomeData) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa dữ liệu này không?',
      onOk: async () => {
        await deleleHomeDataByIdMutation({
          params: {
            id: record.id,
          },
        });
      },
    });
  };
  const columns: TableProps<SCHEMA.HomeData>['columns'] = [
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      ...getColumnSearchProps('title'),
    },
    {
      title: 'Loại',
      dataIndex: 'type',
      key: 'type',
      render: (value: HomeLineType) => {
        return <Tag color="cyan">{homeLineTitle[value]}</Tag>;
      },
      filters: [
        {
          text: 'Nổi bật',
          value: HomeLineType.SPOTLIGHT,
        },
        {
          text: 'Nhóm địa danh',
          value: HomeLineType.GROUP_PLACE,
        }
      ],
      onFilter: (value, record) => value === record.type,
    },
    {
      title: 'Vị trí',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Hiển thị',
      dataIndex: 'visible',
      key: 'visible',
      render: (value: boolean) => {
        return value ? <Tag color="green">Hiển thị</Tag> : <Tag color="gray">Ẩn</Tag>;
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
    <>
      <Card
        title={
          <div className="flex justify-between">
            <div>Danh sách dữ liệu trang chủ</div>
            <Button
              type="primary"
              onClick={onCreate}
            >
              Thêm mới
            </Button>
          </div>
        }
      >
        <Table
          columns={columns}
          dataSource={getListHomeDataQuery?.data?.data?.items}
          pagination={{
            showSizeChanger: false,
            total: getListHomeDataQuery?.data?.data?.total,
            pageSize: PAGE_SIZE,
            onChange: (page) => {
              setPage(page);
            },
          }}
        />
      </Card>
    </>
  );
};

export default List;
