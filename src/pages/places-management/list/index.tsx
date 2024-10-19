import Mapbox from '@/components/Mapbox';
import useMarker from '@/components/Mapbox/hooks/useMarker';
import { useDelelePlaceByIdMutation, useGetListPlaceQuery } from '@/redux/services/placeApi';
import { Card, message, Modal } from 'antd';
import { createStyles } from 'antd-style';
import { MapMouseEvent } from 'mapbox-gl';
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
  const markers = React.useRef<(mapboxgl.Marker | undefined)[]>([]);
  const [record, setRecord] = React.useState<SCHEMA.Place | undefined>(undefined);

  const { addMarker } = useMarker({ ref: mapRef });

  const [deletePlaceByIdMutation] = useDelelePlaceByIdMutation();

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

  const onEdit = (data: SCHEMA.Place) => {
    setRecord(data);
    setIsOpenModalCRUDMarker(true);
  };
  const onDelete = (data: SCHEMA.Place) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa địa danh này không?',
      onOk: async () => {
        const res = await deletePlaceByIdMutation({
          params: {
            id: data.id,
          },
        });
        if ('data' in res) {
          message.success('Xóa thành công');
        }
        if ('error' in res) {
          message.error('Xóa thất bại');
        }
      },
    });
  };
  const onCancel = () => {
    setIsOpenModalCRUDMarker(false);
    setRecord(undefined);
    setCurLocationPicker(undefined);
  };

  // listen click event on map
  useEffect(() => {
    const onClickMap = (e: MapMouseEvent) => {
      setCurLocationPicker([e.lngLat.lng, e.lngLat.lat]);
      setIsOpenModalCRUDMarker(true);
    };
    mapRef.current?.on('click', onClickMap);
    return () => {
      if (mapRef.current) mapRef.current?.off('click', onClickMap);
    };
  }, []);
  // listen zoom event on map
  useEffect(() => {
    const resizeMarker = () => {
      const zoomValue = 9;
      const zoom = mapRef.current?.getZoom() || 0;
      const newSize = Math.max(10, zoom * 5); // Adjust the multiplier as needed
      markers.current.forEach((markerEl) => {
        if (markerEl) {
          markerEl.getElement().style.width = `${newSize}px`;
          markerEl.getElement().style.height = `${newSize}px`;
        }
      });
      const allTitleMarker = document.querySelectorAll('.title-marker');
      allTitleMarker.forEach((titleMarker) => {
        (titleMarker as HTMLElement).style.top = `${newSize * 1.1}px`;
        if (zoom <= zoomValue) (titleMarker as HTMLElement).style.opacity = '0';
        if (zoom > zoomValue) (titleMarker as HTMLElement).style.opacity = '1';
      });
    };
    const onZoom = () => {
      resizeMarker();
    };
    mapRef.current?.on('zoom', onZoom);
    return () => {
      if (mapRef.current) mapRef.current?.off('zoom', onZoom);
    };
  }, []);

  useEffect(() => {
    if (getListPlaceQuery.data && mapRef.current) {
      const items = getListPlaceQuery.data.data.items;
      markers.current.forEach((marker) => marker?.remove());
      markers.current = [];
      items?.forEach((item) => {
        markers.current.push(
          addMarker({
            lat: Number(item.lat),
            lng: Number(item.long),
            content: {
              url: REACT_CDN_URL + item.thumbnail,
              name: item.name,
            },
            onClick: (e) => {
              e.stopPropagation();
              onEdit(item);
            },
          }),
        );
      });
    }
  }, [getListPlaceQuery.data]);

  return (
    <>
      <Card
        size="small"
        className={cx([styles.section])}
        title={`Tất cả địa điểm(${getListPlaceQuery?.data?.data?.total})`}
      >
        <Mapbox
          ref={mapRef}
          className={styles.map}
          initOptions={{
            center: [105.3072384, 18.9004047],
            zoom: 10,
            minZoom: 8,
            maxZoom: 18,
            style: 'mapbox://styles/mapbox/satellite-streets-v12',
          }}
        />
      </Card>
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
