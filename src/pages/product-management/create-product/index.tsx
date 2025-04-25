import Library from '@/components/common/Library';
import { useGetListPlaceQuery } from '@/redux/services/placeApi';
import { useCreateProductMutation } from '@/redux/services/productApi';
// import { useCreateHomeDataMutation } from '@/redux/services/homeApi';
import { useNavigate } from '@umijs/max';
import { Button, Card, Form, Input, message, Select } from 'antd';
// import { useState } from 'react';
// import Transfer from '../component/Transfer';

// placeId: string; name: string; thumbnail: string; description: string

const Create = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [runCreateProductMutation] = useCreateProductMutation();
  const getListPlaceQuery = useGetListPlaceQuery({
    params: {
      page: 1, 
      limit: 100
    }
  })

  const onFinished = async (values: any) => {
    const res = await runCreateProductMutation({
      body: {
        name: values.name,
        description: values.description,
        thumbnail: values.thumbnail,
        placeIds: values.placeIds,
      }
    })
    if ('error' in res) {
      message.error('Có lỗi khi tạo sản phẩm');
      return;
    }
    if ('data' in res) {
      message.success('Tạo sản phẩm thành công');
      navigate(-1);
    }
  };

  return (
    <Card title="Tạo mới category">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinished}
        initialValues={{ visible: false }}
      >
        <Form.Item
          label="Tên sản phẩm"
          name="name"
          required
          rules={[{ required: true, message: 'Vui lòng nhập tên đặc sản' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Các địa danh đính kèm"
          name="placeIds"
          required
          rules={[{ required: true, message: 'Vui lòng nhập Địa danh đính kèm"' }]}
        >
          <Select
            mode="multiple"
            showSearch
            placeholder="Gắn liền với địa danh"
            optionFilterProp="label"
            onChange={(value: string) => {
              console.log(`selected ${value}`);
            }}
            onSearch={(value: string) => {
              console.log(`selected ${value}`);
            }}
            options={getListPlaceQuery.data?.data?.items?.map?.((item) => ({
              label: item.name,
              value: item.id,
            }))}
          />
        </Form.Item>

        <Form.Item
          required
          name="thumbnail"
          label="Ảnh Thumbnail"
        >
          <Library />
        </Form.Item>

        <Form.Item
          label="Mô tả"
          name="description"
          rules={[{ required: true, message: 'Nhập mô tả về địa danh' }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <div className="flex gap-2 justify-end">
            <Button onClick={() => navigate(-1)}>Hủy</Button>
            <Button
              type="primary"
              htmlType="submit"
            >
              Lưu
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Create;
