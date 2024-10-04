import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { forwardRef, ForwardRefRenderFunction, useEffect, useRef } from 'react';
type MapProps = {
  className?: string;
  initOptions?: Omit<mapboxgl.MapOptions, 'container'> & { container?: HTMLElement | string };
};
const Mapbox: ForwardRefRenderFunction<any, MapProps> = ({ className, initOptions }, mapRef) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mapboxgl.accessToken = REACT_MAPBOX_ACCESS_TOKEN;
    if (mapRef && typeof mapRef === 'object' && 'current' in mapRef) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current!,
        ...initOptions,
      });
    }

    return () => {
      // @ts-expect-error: ignore
      mapRef.current.remove();
    };
  }, []);
  return (
    <div
      className={className}
      ref={mapContainerRef}
    >
      Map
    </div>
  );
};

export default forwardRef(Mapbox);
