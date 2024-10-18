import React from 'react';
import { MarkerArgs } from '../type';
import { generateNewMarker } from '../utils/generateNewMarker';

type UseMarkerProps = {
  ref: React.MutableRefObject<mapboxgl.Map | null>;
};
const useMarker = ({ ref }: UseMarkerProps) => {
  const addMarker = ({ lat, lng, content }: MarkerArgs) => {
    if (ref.current) {
      return generateNewMarker({ lat, lng, map: ref.current, content });
    }
    return undefined;
  };
  return {
    addMarker,
  };
};

export default useMarker;
