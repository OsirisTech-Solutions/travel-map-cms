import { Button, ModalProps } from 'antd';
import DOMPurify from 'dompurify';
import React from 'react';
import CModal from '../CModal';
type PreviewHTMlProps = {
  richText: string;
} & ModalProps;
const PreviewHTMl: React.FC<PreviewHTMlProps> = ({ richText, ...props }) => {
  console.log('🚀 -----------------------🚀');
  console.log('🚀 ~ richText:', richText);
  console.log('🚀 -----------------------🚀');
  return (
    <CModal
      centered
      footer={false}
      title="Xem trước nội dung"
      width={900}
      {...props}
    >
      <div
        className="max-h-[750px] p-4 border border-dashed rounded-md overflow-y-scroll"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(richText) }}
      ></div>
      <div className="text-right mt-4">
        <Button type="primary">Đóng prevew</Button>
      </div>
    </CModal>
  );
};

export default PreviewHTMl;
