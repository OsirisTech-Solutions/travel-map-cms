import Mapbox from '@/components/Mapbox';
import { useGetListPlaceQuery } from '@/redux/services/placeApi';
import { Card } from 'antd';
import { createStyles } from 'antd-style';
import React, { useEffect } from 'react';
import CreationDrawer from './component/CreationDrawer';
import PlaceTable from './component/PlaceTable';

const PAGE_SIZE = 10;
const useStyles = createStyles(({ token }) => {
  return {
    map: {
      width: 'PAGE_SIZE0%',
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
  const mapRef = React.useRef<mapboxgl.Map>(null);
  const { styles, cx } = useStyles();
  const [page, setPage] = React.useState(1);
  const [record, setRecord] = React.useState<SCHEMA.Place | undefined>(undefined);

  const [curLocationPicker, setCurLocationPicker] = React.useState<mapboxgl.LngLatLike | undefined>(
    undefined,
  );
  const [isOpenModalCRUDMarker, setIsOpenModalCRUDMarker] = React.useState(false);

  const getListPlaceQuery = useGetListPlaceQuery({
    params: {
      limit: PAGE_SIZE,
      page,
    },
  });

  const onEdit = (record: SCHEMA.Place) => {
    setRecord(record);
    setIsOpenModalCRUDMarker(true);
  };
  const onDelete = (record: SCHEMA.Place) => {
    console.log('delete', record);
  };
  const onCancel = () => {
    setIsOpenModalCRUDMarker(false);
    setRecord(undefined);
    setCurLocationPicker(undefined);
  };

  // listen click event on map
  useEffect(() => {
    mapRef.current?.on('click', (e) => {
      setCurLocationPicker([e.lngLat.lng, e.lngLat.lat]);
      setIsOpenModalCRUDMarker(true);
    });
  }, []);

  return (
    <>
      <Card
        size="small"
        title="Danh sách địa danh"
        className={cx([styles.section])}
      >
        <PlaceTable
          onEdit={onEdit}
          onDelete={onDelete}
          loading={getListPlaceQuery?.isFetching}
          rowKey={'id'}
          dataSource={getListPlaceQuery?.data?.data?.items || []}
          pagination={{
            current: page,
            pageSize: PAGE_SIZE,
            showSizeChanger: false,
            total: getListPlaceQuery?.data?.data?.total,
            onChange: (page) => {
              setPage(page);
            },
          }}
        />
      </Card>
      <Card
        size="small"
        className={cx([styles.section])}
        title={`Tất cả địa điểm(${getListPlaceQuery?.data?.data?.total})`}
      >
        <Mapbox
          ref={mapRef}
          className={styles.map}
          initOptions={{
            center: [105.84713, 21.030653],
            zoom: 10.12,
            minZoom: 8,
            maxZoom: 14,
            style: 'mapbox://styles/mapbox/satellite-streets-v12',
          }}
        />
      </Card>
      <CreationDrawer
        open={isOpenModalCRUDMarker}
        handleClose={onCancel}
        record={record}
        currentLocation={curLocationPicker}
        onClose={onCancel}
        title={record ? 'Chỉnh sửa địa danh' : 'Tạo mới địa danh'}
      />
    </>
  );
};

export default List;
