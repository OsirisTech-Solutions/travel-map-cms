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
  InputNumber,
  message,
  Select,
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
        lat: Number(record?.lat),
        long: Number(record?.long),
        categoryId: record?.categoryId,
        thumbnail: record?.thumbnail,
        name: record?.name,
        description: record?.description,
        content: record?.content,
      });
    } else if (currentLocation) {
      form.setFieldsValue({
        long: (currentLocation as any)?.[0],
        lat: (currentLocation as any)?.[1],
      });
    }
  }, [record, currentLocation]);

  return (
    <Drawer
      width={'100%'}
      forceRender
      {...props}
      onClose={onClose}
    >
      <Form<REQUEST_DEFIND.CRUDPlaceRequestBody>
        form={form}
        onFinish={onSubmit}
        layout="vertical"
      >
        <div className='flex justify-between gap-4'>
        <Form.Item
          className='w-full'
          label='Longitude'
          name='long'
          required
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập longitude',
            },
            {
              type: 'number',
              message: 'Giá trị phải là số',
            },
            {
              max: 180,
              min: -180,
              message: 'Giá trị nằm trong khoảng -180 đến 180',
            }
          ]}>
          <InputNumber className='w-full' placeholder='Nhập longitude' />
        </Form.Item>
        <Form.Item
          className='w-full'
          label='Latitude'
          name='lat'
          required rules={[
            {
              required: true,
              message: 'Vui lòng nhập longitude',
            },
            {
              type: 'number',
              message: 'Giá trị phải là số',
            },
            {
              max: 90,
              min: -90,
              message: 'Giá trị nằm trong khoảng -90 đến 90',
            }
          ]}>
          <Input className='w-full' placeholder='Nhập latitude' />
        </Form.Item>
      </div>
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
