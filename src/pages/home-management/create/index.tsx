import { homeLineTitle, HomeLineType } from '@/utils/constant'
import { useNavigate } from '@umijs/max'
import { Button, Card, Form, Input, Select, Switch } from 'antd'
import React from 'react'

const Create = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const onFinished = (values: any) => {
    console.log(values)
  }
  return (
    <Card title='Tạo mới dữ liệu trang chủ'>
      <Form
        form={form}
        layout='vertical'
        onFinish={onFinished}
        initialValues={{ visible: false }}
      >
        <Form.Item label='Tên' name='title'>
          <Input />
        </Form.Item>
        <Form.Item label='Loại' name='type'>
          <Select>
            <Select.Option value={HomeLineType.SPOTLIGHT}>{homeLineTitle[HomeLineType.SPOTLIGHT]}</Select.Option>
            <Select.Option value={HomeLineType.GROUP_PLACE}>{homeLineTitle[HomeLineType.GROUP_PLACE]}</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label='Vị trí' name='position'>
          <Input />
        </Form.Item>
        <Form.Item label='Hiển thị' name='visible'>
          <Switch />
        </Form.Item>
        <Form.Item>
          <div className='flex gap-2 justify-end'>
            <Button onClick={() => navigate(-1)}>Hủy</Button>
            <Button type='primary' htmlType='submit'>Thêm mới</Button>
          </div>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default Create