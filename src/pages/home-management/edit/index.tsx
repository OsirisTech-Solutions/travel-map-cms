import { useGetHomeDataByIdQuery, useUpdateHomeDataMutation } from '@/redux/services/homeApi';
import { homeLineTitle, HomeLineType } from '@/utils/constant';
import { useNavigate, useParams } from '@umijs/max';
import { Button, Card, Form, Input, InputNumber, message, Select, Switch } from 'antd';
import { useEffect } from 'react';
import Transfer from '../component/Transfer';

const Edit = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  const getHomeDataByIdQuery = useGetHomeDataByIdQuery(
    {
      params: {
        id: id || '',
      },
    },
    {
      skip: !id,
    },
  );

  const [updateHomeDataMutation] = useUpdateHomeDataMutation();
  const onFinished = async (values: any) => {
    try {
      delete values.type;
    } catch (e) {}
    if (!id) return;
    const res = await updateHomeDataMutation({
      params: {
        id,
      },
      body: {
        ...values,
      },
    });
    if ('data' in res) {
      message.success('Chỉnh sửa dữ liệu thành công');
      navigate(-1);
    }
  };

  useEffect(() => {
    if (getHomeDataByIdQuery.data) {
      form.setFieldsValue({
        items: getHomeDataByIdQuery?.data?.data?.items,
        position: getHomeDataByIdQuery?.data?.data?.position,
        title: getHomeDataByIdQuery?.data?.data?.title,
        type: getHomeDataByIdQuery?.data?.data?.type,
        visible: getHomeDataByIdQuery?.data?.data?.visible,
      });
    }
  }, [getHomeDataByIdQuery.data]);
  return (
    <Card title="Tạo mới dữ liệu trang chủ">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinished}
        initialValues={{ visible: false }}
      >
        <Form.Item
          label="Tên"
          name="title"
          required
          rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Loại"
          name="type"
        >
          <Select disabled>
            <Select.Option value={HomeLineType.SPOTLIGHT}>
              {homeLineTitle[HomeLineType.SPOTLIGHT]}
            </Select.Option>
            <Select.Option value={HomeLineType.GROUP_PLACE}>
              {homeLineTitle[HomeLineType.GROUP_PLACE]}
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Vị trí"
          name="position"
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Hiển thị"
          name="visible"
        >
          <Switch />
        </Form.Item>
        <Form.Item name="items">
          <Transfer />
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

export default Edit;
