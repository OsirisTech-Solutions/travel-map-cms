import React, { useEffect } from 'react'
import mapboxgl from 'mapbox-gl'

const useSearch = (mapRef: React.RefObject<mapboxgl.Map>) => {

  useEffect(() => {
    mapRef.current.on()
  }, [])
  return 
}

export default useSearch