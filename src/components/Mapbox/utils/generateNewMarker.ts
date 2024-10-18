import { Map, Marker } from 'mapbox-gl';
import { MarkerArgs } from '../type';

export const generateNewMarker = ({ lat, lng, map, content }: MarkerArgs & { map: Map }) => {
  const markerEl = document.createElement('div');
  markerEl.className = 'custom-marker';
  markerEl.innerHTML = `
  <img src='${content.url}' alt='travel' class='img-marker' />
  <div class='title-marker'>${content.name}</div>
  `;
  // markerEl.addEventListener('click', () => {

  // });
  new Marker(markerEl).setLngLat([lng, lat]).addTo(map);
  return markerEl;
};
