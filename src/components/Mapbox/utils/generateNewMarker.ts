import { Map, Marker } from 'mapbox-gl';
import { MarkerContent } from '../type';

export const generateNewMarker = ({
  lat,
  lng,
  map,
  content,
}: {
  lng: number;
  lat: number;
  map: Map;
  content: MarkerContent;
}) => {
  const markerEl = document.createElement('div');
  markerEl.className = 'custom-marker';
  markerEl.innerHTML = `
  <img src='${content.url}' alt='travel' class='img-marker' />
  <div class='title-marker'>${content.name}</div>
  `;
  new Marker(markerEl).setLngLat([lng, lat]).addTo(map);
  return markerEl;
};
