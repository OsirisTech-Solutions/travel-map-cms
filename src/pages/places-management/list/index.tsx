import CCollapse from '@/components/common/CCollapse';
import { CaretRightOutlined } from '@ant-design/icons';
import { Card, CollapseProps, theme } from 'antd';
import React, { CSSProperties } from 'react';
import PlaceTable from './component/PlaceTable';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const List = () => {
  const { token } = theme.useToken();

  const panelStyle: React.CSSProperties = {
    background: token.colorWhite,
    borderRadius: token.borderRadiusLG,
  };

  const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (panelStyle) => [
    {
      key: '1',
      label: 'Di tích lịch sử',
      children: <PlaceTable />,
      style: panelStyle,
    },
    {
      key: '2',
      label: 'Vui chơi giải trí',
      children: <p>{text}</p>,
      style: panelStyle,
    },
    {
      key: '3',
      label: 'Danh lam thắng cảnh',
      children: <p>{text}</p>,
      style: panelStyle,
    },
  ];
  return (
    <>
      <Card size="small">
        <CCollapse
          accordion
          defaultActiveKey={['1']}
          expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
          items={getItems(panelStyle)}
        />
      </Card>
    </>
  );
};

export default List;
