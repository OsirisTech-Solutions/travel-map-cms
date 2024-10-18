import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input, Modal, Table } from 'antd';
import { useState } from 'react';

const Tourism = () => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  return (
    <Flex vertical>
      <Flex>
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          onClick={() => setOpen(true)}
        >
          Thêm mới
        </Button>
      </Flex>

      <Table
        dataSource={dataSource}
        columns={columns}
      />

      <Modal
        title="Tạo loại hình mới"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <Form
          name="wrap"
          labelCol={{ flex: '110px' }}
          labelAlign="left"
          labelWrap
          wrapperCol={{ flex: 1 }}
          colon={false}
          style={{ maxWidth: 600 }}
        >
          <Form.Item
            label="Tên loại hình"
            name="title"
            rules={[{ required: true, message: 'Nhập tên loại hình' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: 'Nhập mô tả về địa danh' }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item label=" ">
            <Button
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Flex>
  );
};

export default Tourism;
