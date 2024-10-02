import CCollapse from '@/components/common/CCollapse';
import { CaretRightOutlined } from '@ant-design/icons';
import { Card, CollapseProps, Input, theme } from 'antd';
import React, { CSSProperties } from 'react';
import PlaceTable from './component/PlaceTable';
import Mapbox from '@/components/Mapbox';
import { createStyles } from 'antd-style';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const useStyles = createStyles(({ token }) => {
  return {
    map: {
      width: '100%',
      height: '400px',
      borderRadius: token.borderRadiusLG
    },
    section: {
      marginBottom: token.paddingContentHorizontal
    }
  }
})
const List = () => {
  const { token } = theme.useToken();
  const mapRef = React.useRef(null);
  const { styles, cx } = useStyles();

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
      <Card size="small" className={cx([styles.section])}>
        <CCollapse
          accordion
          defaultActiveKey={['1']}
          expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
          items={getItems(panelStyle)}
        />

      </Card>
      <Card size='small' className={cx([styles.section])}>
        <div>
          <Input.Search placeholder='Tìm kiếm địa điểm' />
        </div>
        <Mapbox ref={mapRef} className={styles.map} initOptions={{
          center: [105.847130, 21.030653],
          zoom: 10.12,
          minZoom: 8,
          maxZoom: 14
        }} />
      </Card>
    </>
  );
};

export default List;
