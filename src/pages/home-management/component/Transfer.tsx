import CTable from '@/components/common/CTable';
import { useGetListCategoryQuery } from '@/redux/services/categoryApi';
import { useGetListPlaceQuery } from '@/redux/services/placeApi';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { Button, Drawer, Image, Tag, Tooltip } from 'antd';
import classNames from 'classnames';
import React, { useEffect, useMemo } from 'react';

type TransferProps = {
  id?: string;
  value?: string[];
  onChange?: (value: string[]) => void;
};
const Transfer: React.FC<TransferProps> = ({ id, value, onChange }) => {
  const [isOpenDrawerAddMoreItem, setIsOpenDrawerAddMoreItem] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState<SCHEMA.Place[]>([]);

  const selectedIds = useMemo(() => {
    return selectedItems.map((item) => item.id);
  }, [selectedItems]);
  const onClickItem = (item: SCHEMA.Place) => {
    if (selectedItems.includes(item)) {
      const data = selectedItems.filter((selectedItem) => selectedItem.id !== item.id);
      onChange?.(data.map((item) => item.id));
    } else {
      const data = [...selectedItems, item];
      onChange?.(data.map((item) => item.id));
    }
  };

  const onRemoveItem = (record: SCHEMA.Place) => {
    const data = selectedItems.filter((selectedItem) => selectedItem.id !== record.id);
    onChange?.(data.map((item) => item.id));
  };

  const onOpenDrawerAddMoreItem = () => {
    setIsOpenDrawerAddMoreItem(true);
  };
  const onCloseDrawerAddMoreItem = () => {
    setIsOpenDrawerAddMoreItem(false);
  };
  const getListCategoryQuery = useGetListCategoryQuery({
    params: {
      limit: 100,
      page: 1,
    },
  });
  const getListPlaceQuery = useGetListPlaceQuery({
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
      title: 'Xóa',
      dataIndex: 'action',
      key: 'action',
      width: 80,
      align: 'center',
      render: (value, record) => (
        <Tooltip title="Xóa">
          <Button
            onClick={() => onRemoveItem(record)}
            size="small"
            icon={<MinusCircleOutlined />}
          />
        </Tooltip>
      ),
    },
    {
      title: 'Tên địa danh',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <div>{text}</div>,
    },
    {
      title: 'Ảnh thumbnail',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (value) => (
        <Image
          preview
          width={80}
          height={80}
          src={REACT_CDN_URL + value}
        />
      ),
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      render: (value: string) => <div className="line-clamp-3">{value}</div>,
    },
    {
      title: 'Loại',
      dataIndex: 'categoryId',
      key: 'categoryId',
      render: (value) => {
        return <Tag color="cyan">{getNameCategory(value)}</Tag>;
      },
    },
  ];

  useEffect(() => {
    console.log('value');
    if (value) {
      setSelectedItems(
        value.map(
          (item) =>
            getListPlaceQuery.data?.data?.items.find((place) => place.id === item) as SCHEMA.Place,
        ),
      );
    }
  }, [value]);
  return (
    // @ts-ignore
    <div
      id={id}
      className="border border-gray-200 rounded p-4"
    >
      <div className="flex justify-between">
        <div className="font-semibold text-lg mb-4">Danh sách địa danh</div>
        <Button
          type="primary"
          onClick={onOpenDrawerAddMoreItem}
          icon={<PlusCircleOutlined />}
        >
          Thêm địa danh
        </Button>
      </div>
      <CTable<SCHEMA.Place>
        columns={columns}
        dataSource={selectedItems}
        rowKey={'id'}
        pagination={false}
        scroll={{ y: 700 }}
      />
      <Drawer
        onClose={onCloseDrawerAddMoreItem}
        open={isOpenDrawerAddMoreItem}
        title="Danh sách địa danh"
        width={400}
      >
        <div
          className={classNames([
            'font-semibold my-2',
            selectedItems.length > 0 ? 'opacity-1' : 'opacity-0',
          ])}
        >
          {selectedItems.length} địa danh được chọn
        </div>
        <div className="flex flex-col gap-2">
          {getListPlaceQuery?.data?.data?.items.map((item) => (
            <div
              onClick={() => onClickItem(item)}
              className={classNames([
                'flex gap-4 p-2 border border-gray-200 rounded cursor-pointer hover:border-blue-300',
                'transition-all',
                selectedIds.includes(item.id) && 'bg-blue-300',
              ])}
              key={item.id}
            >
              <img
                className="object-cover w-16 h-16 rounded"
                src={REACT_CDN_URL + item?.thumbnail}
              />
              <div>
                <div className="font-semibold text-lg">{item.name}</div>
                <Tag color="cyan">{getNameCategory(item.categoryId)}</Tag>
              </div>
            </div>
          ))}
        </div>
      </Drawer>
    </div>
  );
};

export default Transfer;
