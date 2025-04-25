
import { useDeleteProductMutation, useGetListProductQuery } from '@/redux/services/productApi';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from '@umijs/max';
import { Button, Card, message } from 'antd';
import React from 'react';
import ProductTable from './children/ProductTable';

const PAGE_SIZE = 10;

// placeId: string; name: string; thumbnail: string; description: string

const List = () => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(1);

  // const [form] = Form.useForm();

  const getListCategoryQuery = useGetListProductQuery({
    params: {
      page: page,
      limit: PAGE_SIZE
    },
  });
  const [runDeleteProductMutation] = useDeleteProductMutation();
  // console.log("getListCategoryQuery", getListCategoryQuery)
  return (
    <>
      <div className="flex items-center justify-between my-4">
        <h1 className="text-lg font-semibold">Sản phẩm</h1>
        <div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              navigate('/product-management/create-product');
            }}
          >
            Thêm sản phẩm
          </Button>
        </div>
      </div>
      <Card size="small">
        <ProductTable
          dataSource={getListCategoryQuery?.data?.data?.items}
          loading={getListCategoryQuery?.isFetching}
          rowKey={'id'}
          pageConfig={{ pageSize: PAGE_SIZE, current: page }}
          pagination={{
            current: page,
            pageSize: PAGE_SIZE,
            showSizeChanger: false,
            total: getListCategoryQuery?.data?.data?.total,
            onChange: (page) => {
              setPage(page);
            },
          }}
          onDelete={async (record) => {
            const res = await runDeleteProductMutation({
              body: {
                id: record.id,
              },
            });
            if ('error' in res) {
              message.error('Có lỗi khi xóa sản phẩm');
              return;
            }
            if ('data' in res) {
              message.success('Xóa sản phẩm thành công');
            }
          }}
          onEdit={(record) => {
            navigate(`/product-management/edit-product/${record.id}`);
          }}
        />
      </Card>
    </>
  );
};

export default List;
