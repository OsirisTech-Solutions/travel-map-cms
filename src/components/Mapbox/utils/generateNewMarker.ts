import { Map, Marker } from 'mapbox-gl';

export const generateNewMarker = ({ lat, lng, map }: { lng: number; lat: number; map: Map }) => {
  const markerEl = document.createElement('div');
  markerEl.className = 'custom-marker';
  markerEl.innerHTML = `sdlsdal`
  new Marker(markerEl).setLngLat([lng, lat]).addTo(map);
};
