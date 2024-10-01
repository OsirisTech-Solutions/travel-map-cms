import { CaretRightOutlined } from '@ant-design/icons';
import type { CollapseProps } from 'antd';
import { Collapse, theme } from 'antd';
import React from 'react';
import { useStylish } from '../index.style';
const CCollapse: React.FC<CollapseProps> = ({ ...props }) => {
  const { token } = theme.useToken();
  const stylish = useStylish();
  return (
    <Collapse
      className={stylish.collapse}
      expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      style={{ background: token.colorWhite }}
      {...props}
    />
  );
};

export default CCollapse;
