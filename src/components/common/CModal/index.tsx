import { Modal, ModalProps } from 'antd';
import { createStyles } from 'antd-style';
import React from 'react';

const useStyles = createStyles(({ css }) => {
  return {
    modal: css`
      .ant-modal-close {
        top: -20px;
        left: -20px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        background-color: white;
        border-radius: 50%;
      }

      .ant-modal-close .anticon-close-circle svg {
        width: 24px !important;
        height: 24px !important;
        color: rgba(0, 0, 0, 0.25);
      }

      .ant-modal-close:hover {
        color: black;
        background-color: white;
      }

      .ant-modal-close svg:hover {
        color: rgba(0, 0, 0, 0.85);
      }
    `,
  };
});
const CModal: React.FC<ModalProps> = ({ className, children, ...props }) => {
  const { styles, cx } = useStyles();
  return (
    <Modal
      centered
      styles={{
        content: {
          borderRadius: '24px',
          border: '10px solid rgba(255,255,255,0.8)',
          boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.15)',
          padding: '0.75rem',
        },
      }}
      {...props}
      className={cx([styles.modal, className || ''])}
    >
      {children}
    </Modal>
  );
};

export default CModal;
