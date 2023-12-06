import {useEffect, useState, MutableRefObject, useRef} from 'react';
import {Map, TileLayer} from 'leaflet';
import {City} from '../contracts/contaracts.ts';
import {MAP_LAYER_URL, OPENSOURCE_ATTRIBUTION} from '../constants/constants.ts';


function useMap(mapRef: MutableRefObject<HTMLElement | null>, city: City, interactive: boolean): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);


  useEffect(() => {

    const mapOptions = {
      center: {
        lat: city.location.latitude,
        lng: city.location.longitude
      },
      zoom: city.location.zoom,
      dragging: interactive,
      keyboard: interactive,
      zoomControl: interactive,
      attributionControl: interactive,
      scrollWheelZoom: interactive,
      doubleClickZoom: interactive,
      onDoubleClick: interactive
    };

    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, mapOptions);

      const layer = new TileLayer(
        MAP_LAYER_URL,
        {
          attribution:
            OPENSOURCE_ATTRIBUTION
        }
      );

      instance.addLayer(layer);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [interactive, mapRef, city]);

  return map;
}

export {useMap};
