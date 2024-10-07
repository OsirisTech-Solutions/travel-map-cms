import CEditor from '@/components/common/CEditor';
import CModal from '@/components/common/CModal';
import { Form, Input, ModalProps, Space, Tag, Typography } from 'antd';
import React from 'react';

type CreationModalProps = ModalProps & {
  currentLocation: mapboxgl.LngLatLike | undefined;
};
const CreationModal: React.FC<CreationModalProps> = ({ currentLocation, ...props }) => {
  return (
    <CModal
      width={900}
      {...props}
    >
      <div style={{ marginBottom: '1.5rem' }}>
        <Space>
          <Typography.Title level={4}>Vị trí: </Typography.Title>
          <Tag color="blue">{JSON.stringify(currentLocation || '')}</Tag>
        </Space>
      </div>
      <Form>
        <Form.Item>
          <Input
            placeholder="Tên địa danh"
            required
          />
        </Form.Item>
        <Form.Item>
          <CEditor />
        </Form.Item>
      </Form>
    </CModal>
  );
};

export default CreationModal;
