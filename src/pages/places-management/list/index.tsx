import CCollapse from '@/components/common/CCollapse';
// import SearchBox from '@/components/common/SearchBox';
import Mapbox from '@/components/Mapbox';
// import useSearch from '@/components/Mapbox/hooks/useSearch';
import { CaretRightOutlined } from '@ant-design/icons';
import { Card, CollapseProps, Space, theme } from 'antd';
import { createStyles } from 'antd-style';
import React, { CSSProperties, useEffect } from 'react';
import CreationModal from './component/CreationModal';
import PlaceTable from './component/PlaceTable';
import Visible from '@/components/common/Visible';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
enum PlaceType {
  HISTORICAL = 'HISTORICAL',
  ENTERTAINMENT = 'ENTERTAINMENT',
  SCENIC = 'SCENIC',
}
const useStyles = createStyles(({ token }) => {
  return {
    map: {
      width: '100%',
      height: '400px',
      borderRadius: token.borderRadiusLG,
    },
    section: {
      marginBottom: token.paddingContentHorizontal,
    },
    searchContainer: {
      display: 'flex',
      gap: token.paddingContentHorizontal,
    },
  };
});
const List = () => {
  const { token } = theme.useToken();
  const mapRef = React.useRef<mapboxgl.Map>(null);
  const { styles, cx } = useStyles();
  const [visibleData, setVisibleData] = React.useState({
    [PlaceType.ENTERTAINMENT]: true,
    [PlaceType.HISTORICAL]: true,
    [PlaceType.SCENIC]: true,
  });
  const [acticedPlaceType, setActivedPlaceType] = React.useState<PlaceType>(PlaceType.HISTORICAL);

  const [curLocationPicker, setCurLocationPicker] = React.useState<mapboxgl.LngLatLike | undefined>(
    undefined,
  );
  const [isOpenModalCreateNewMarker, setIsOpenModalCreateNewMarker] = React.useState(false);

  const panelStyle: React.CSSProperties = {
    background: token.colorWhite,
    borderRadius: token.borderRadiusLG,
  };

  const onVisibleLocationType = (type: PlaceType) => {
    console.log("🚀 ---------------------------------------🚀")
    console.log("🚀 ~ onVisibleLocationType ~ type:", type)
    console.log("🚀 ---------------------------------------🚀")
    switch (type) {
      case PlaceType.HISTORICAL:
        setVisibleData({
          ...visibleData,
          [PlaceType.HISTORICAL]: !visibleData[PlaceType.HISTORICAL],
        });
        break;
      case PlaceType.ENTERTAINMENT:
        setVisibleData({
          ...visibleData,
          [PlaceType.ENTERTAINMENT]: !visibleData[PlaceType.ENTERTAINMENT],
        });
        break;
      case PlaceType.SCENIC:
        setVisibleData({
          ...visibleData,
          [PlaceType.SCENIC]: !visibleData[PlaceType.SCENIC],
        });
        break;
      default:
    }
  }

  const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (panelStyle) => [
    {
      key: PlaceType.HISTORICAL,
      label: 'Di tích lịch sử (19)',
      children: <PlaceTable />,
      style: panelStyle,
      extra: <Space>
        <Visible value={visibleData[PlaceType.HISTORICAL]} onChange={() => onVisibleLocationType(PlaceType.HISTORICAL)} />
      </Space>
    },
    {
      key: PlaceType.ENTERTAINMENT,
      label: 'Vui chơi giải trí (2)',
      children: <p>{text}</p>,
      style: panelStyle,
      extra: <Space>
        <Visible value={visibleData[PlaceType.ENTERTAINMENT]} onChange={() => onVisibleLocationType(PlaceType.ENTERTAINMENT)} />
      </Space>
    },
    {
      key: PlaceType.SCENIC,
      label: 'Danh lam thắng cảnh (10)',
      children: <p>{text}</p>,
      style: panelStyle,
      extra: <Space>
      <Visible value={visibleData[PlaceType.SCENIC]} onChange={() => onVisibleLocationType(PlaceType.SCENIC)} />
    </Space>
    },
  ];
  // const {
  //   search,
  //   data: searchResult,
  //   isLoading,
  // } = useSearch({
  //   access_token: REACT_MAPBOX_ACCESS_TOKEN,
  // });
  // const onSearch = (value: string) => {
  //   search(value);
  // };

  // const onSelect = (data: string) => {
  //   console.log('onSelect', data);
  // };

  const onCancel = () => {
    setIsOpenModalCreateNewMarker(false);
  };

  //
  useEffect(() => {
    mapRef.current?.on('click', (e) => {
      setCurLocationPicker([e.lngLat.lng, e.lngLat.lat]);
      setIsOpenModalCreateNewMarker(true);
    });
  }, []);

  return (
    <>
      <Card
        size="small"
        title="Loại địa điểm"
        className={cx([styles.section])}
      >
        <CCollapse
          accordion
          activeKey={acticedPlaceType}
          onChange={(key) => setActivedPlaceType(key as PlaceType)}
          expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
          items={getItems(panelStyle)}
        />
      </Card>
      <Card
        size="small"
        className={cx([styles.section])}
        title="Tất cả địa điểm(3)"
      >
        <Mapbox
          ref={mapRef}
          className={styles.map}
          initOptions={{
            center: [105.84713, 21.030653],
            zoom: 10.12,
            minZoom: 8,
            maxZoom: 14,
          }}
        />
      </Card>
      <CreationModal
        currentLocation={curLocationPicker}
        open={isOpenModalCreateNewMarker}
        onCancel={onCancel}
        title="Thêm địa danh mới"
      />
    </>
  );
};

export default List;
