import { useCreateHomeDataMutation } from '@/redux/services/homeApi';
import { homeLineTitle, HomeLineType } from '@/utils/constant';
import { useNavigate } from '@umijs/max';
import { Button, Card, Form, Input, InputNumber, message, Select, Switch } from 'antd';
import Transfer from '../component/Transfer';

const Create = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [createHomeDataMutation] = useCreateHomeDataMutation();
  const onFinished = async (values: any) => {
    const res = await createHomeDataMutation({
      body: {
        ...values,
      },
    });
    if ('data' in res) {
      message.success('Tạo dữ liệu thành công');
      navigate(-1);
    }
  };
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
          <Select>
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

export default Create;
