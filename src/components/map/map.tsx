import {useEffect, useRef} from 'react';
import {layerGroup, Marker} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {City, Offer} from '../../contracts/contaracts.ts';
import {useMap} from '../../hooks/useMap.ts';
import {ACTIVE_ICON, DEFAULT_ICON, MAP_TYPE_CLASS} from '../../constants/constants.ts';

type MapProps = {
  city: City;
  offers: Offer[];
  type: MAP_TYPE_CLASS;
  selectedOffer: string | undefined;
};

function Map(props: MapProps) {
  const {city, offers, selectedOffer} = props;
  const interactive = (MAP_TYPE_CLASS.CITY) === props.type;
  const mapRef = useRef(null);
  const map = useMap(mapRef, city, interactive);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        marker
          .setIcon((offer.id === selectedOffer) ? ACTIVE_ICON : DEFAULT_ICON)
          .addTo(markerLayer);
      });
      if (selectedOffer) {
        const offer = offers.find((el) => el.id === selectedOffer);
        map.setView([offer!.location.latitude, offer!.location.longitude]);
      } else if (interactive) {
        map.setView([city.location.latitude,city.location.longitude],city.location.zoom);
      }
      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedOffer, city]);

  return(
    <section className={`${props.type} map`} ref={mapRef}/>
  );
}

export {Map};
