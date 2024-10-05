import CCollapse from '@/components/common/CCollapse';
// import SearchBox from '@/components/common/SearchBox';
import Mapbox from '@/components/Mapbox';
// import useSearch from '@/components/Mapbox/hooks/useSearch';
import { CaretRightOutlined } from '@ant-design/icons';
import { Card, CollapseProps, theme } from 'antd';
import { createStyles } from 'antd-style';
import React, { CSSProperties, useEffect } from 'react';
import CreationModal from './component/CreationModal';
import PlaceTable from './component/PlaceTable';

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

  const [curLocationPicker, setCurLocationPicker] = React.useState<mapboxgl.LngLatLike | undefined>(
    undefined,
  );
  const [isOpenModalCreateNewMarker, setIsOpenModalCreateNewMarker] = React.useState(false);

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
        className={cx([styles.section])}
      >
        <CCollapse
          accordion
          defaultActiveKey={['1']}
          expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
          items={getItems(panelStyle)}
        />
      </Card>
      <Card
        size="small"
        className={cx([styles.section])}
      >
        {/* <SearchBox
          isLoading={isLoading}
          onSearch={onSearch}
          onSelect={onSelect}
          options={searchResult?.features?.map((feature) => ({
            value: feature.id,
            label: feature.properties?.name,
          }))}
        /> */}
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
