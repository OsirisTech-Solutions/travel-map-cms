import React, { forwardRef, ForwardRefRenderFunction, useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
type MapProps = {
  className?: string
  initOptions?: Omit<mapboxgl.MapOptions, 'container'> & { container?: HTMLElement | string }
}
const Mapbox: ForwardRefRenderFunction<any, MapProps> = ({ className, initOptions }, mapRef) => {
  const mapContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoidGhhbmhjb25nbnM5NCIsImEiOiJjbHd2aGNobHcwZWQxMmtzZGJ4aXhmY2kwIn0.Y6wneINTmjC-HrM34XbFnw'
    if (mapRef && typeof mapRef === 'object' && 'current' in mapRef) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current!,
        ...initOptions
      });
    }

    return () => {
      // @ts-expect-error: ignore
      mapRef.current.remove()
    }
  }, [initOptions])
  return (
    <div className={className} ref={mapContainerRef}>Map</div>
  )
}

export default forwardRef(Mapbox)