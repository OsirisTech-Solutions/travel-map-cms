import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { forwardRef, ForwardRefRenderFunction, useEffect, useRef } from 'react';
type MapProps = {
  className?: string;
  initOptions?: Omit<mapboxgl.MapOptions, 'container'> & { container?: HTMLElement | string };
};
const Mapbox: ForwardRefRenderFunction<mapboxgl.Map, MapProps> = (
  { className, initOptions },
  mapRef,
) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mapboxgl.accessToken = REACT_MAPBOX_ACCESS_TOKEN;
    if (mapRef && typeof mapRef === 'object' && 'current' in mapRef) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current!,
        ...initOptions,
      });
      mapRef.current.getCanvas().style.cursor = 'default'; // Change to grabbing during drag
    }

    return () => {
      // @ts-expect-error: ignore
      mapRef.current.remove();
    };
  }, []);

  // change cursor when dragging or interacting with the map
  useEffect(() => {
    if (mapRef && typeof mapRef === 'object' && 'current' in mapRef) {
      // Change cursor when dragging or interacting with the map
      // @ts-expect-error: ignore
      mapRef.current.on('dragstart', () => {
        // @ts-expect-error: ignore
        mapRef.current.getCanvas().style.cursor = 'grabbing'; // Change to grabbing during drag
      });

      // @ts-expect-error: ignore
      mapRef.current.on('dragend', () => {
        // @ts-expect-error: ignore
        mapRef.current.getCanvas().style.cursor = 'default'; // Revert to default after drag
      });

      // @ts-expect-error: ignore
      mapRef.current.on('mousemove', () => {
        // @ts-expect-error: ignore
        mapRef.current.getCanvas().style.cursor = 'default'; // Change to pointer during interaction
      });
    }
    return () => {
      if (mapRef && typeof mapRef === 'object' && 'current' in mapRef) {
        // @ts-expect-error: ignore
        mapRef.current.off('dragstart');
        // @ts-expect-error: ignore
        mapRef.current.off('dragend');
        // @ts-expect-error: ignore
        mapRef.current.off('mousemove');
      }
    };
  }, []);
  return (
    <div
      style={{
        cursor: 'default',
      }}
      className={className}
      ref={mapContainerRef}
    />
  );
};

export default forwardRef(Mapbox);
