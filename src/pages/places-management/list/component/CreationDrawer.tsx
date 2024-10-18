import CEditor from '@/components/common/CEditor';
import Library from '@/components/common/Library';
import { useGetListCategoryQuery } from '@/redux/services/categoryApi';
import { useCreatePlaceMutation, useUpdatePlaceMutation } from '@/redux/services/placeApi';
import {
  Button,
  Drawer,
  DrawerProps,
  Form,
  Input,
  message,
  Select,
  Space,
  Tag,
  Typography,
} from 'antd';
import React, { useEffect } from 'react';

type CreationDrawerProps = DrawerProps & {
  record?: SCHEMA.Place;
  currentLocation?: mapboxgl.LngLatLike | undefined;
  handleClose: () => void;
};
const CreationDrawer: React.FC<CreationDrawerProps> = ({
  record,
  currentLocation,
  handleClose,
  ...props
}) => {
  const [form] = Form.useForm();

  const [createPlaceMutation] = useCreatePlaceMutation();
  const [updatePlaceMutation] = useUpdatePlaceMutation();

  const getListCategoryQuery = useGetListCategoryQuery({
    params: {
      limit: 100,
      page: 1,
    },
  });
  const onClose = () => {
    handleClose();
    form.resetFields();
  };

  const onSubmit = async (values: REQUEST_DEFIND.CRUDPlaceRequestBody) => {
    if (!record) {
      const res = await createPlaceMutation({
        body: {
          ...values,
          lat: '' + values?.lat,
          long: '' + values?.long,
        },
      });
      if ('data' in res) {
        message.success('Tạo địa danh thành công');
      }
      if ('error' in res) {
        message.error('Tạo địa danh thất bại');
      }
    } else {
      // update
      console.log('update', values);
      const res = await updatePlaceMutation({
        body: {
          ...values,
          lat: '' + values?.lat,
          long: '' + values?.long,
        },
        params: {
          id: record.id,
        },
      });
      if ('data' in res) {
        message.success('Cập nhật địa danh thành công');
      }
      if ('error' in res) {
        message.error('Tạo địa danh thất bại');
      }
    }
    onClose();
  };

  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        lat: record?.lat,
        long: record?.long,
        categoryId: record?.categoryId,
        thumbnail: record?.thumbnail,
        name: record?.name,
        description: record?.description,
        content: record?.content,
      });
    } else if (currentLocation) {
      form.setFieldsValue({
        lat: (currentLocation as any)?.[0],
        long: (currentLocation as any)?.[1],
      });
    }
  }, [record, currentLocation]);

  const lat = Form.useWatch('lat', form);
  const lng = Form.useWatch('long', form);
  return (
    <Drawer
      width={'100%'}
      forceRender
      {...props}
      onClose={onClose}
    >
      <div style={{ marginBottom: '1.5rem' }}>
        <Space>
          <Typography.Title level={4}>Vị trí: </Typography.Title>
          <Tag color="blue">Lat: {lat}</Tag>
          <Tag color="blue">Long: {lng}</Tag>
        </Space>
      </div>
      <Form<REQUEST_DEFIND.CRUDPlaceRequestBody>
        form={form}
        onFinish={onSubmit}
        layout="vertical"
      >
        <Form.Item
          hidden
          name="lat"
        />
        <Form.Item
          hidden
          name="long"
        />
        <Form.Item
          required
          rules={[{ required: true, message: 'Vui lòng nhập tên địa danh' }]}
          name="categoryId"
          label="Loại địa danh"
        >
          <Select
            options={getListCategoryQuery?.data?.data?.items.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
          />
        </Form.Item>
        <Form.Item
          required
          name="thumbnail"
          label="Thumbnail"
        >
          <Library />
        </Form.Item>
        <Form.Item
          required
          rules={[{ required: true, message: 'Vui lòng nhập tên địa danh' }]}
          name="name"
          label="Tên địa danh"
        >
          <Input placeholder="Tên địa danh" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Tên địa danh"
        >
          <Input.TextArea
            rows={3}
            maxLength={1000}
            placeholder="Mô tả"
          />
        </Form.Item>
        <Form.Item
          name="content"
          label="Nội dung"
        >
          <CEditor />
        </Form.Item>
        <Form.Item className="flex justify-end">
          <div className="flex gap-2">
            <Button
              type="primary"
              htmlType="submit"
            >
              Lưu vị trí
            </Button>
            <Button onClick={onClose}>Hủy</Button>
          </div>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default CreationDrawer;
