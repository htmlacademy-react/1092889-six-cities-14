import {useEffect, useRef} from 'react';
import {layerGroup, Marker} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {City, Offer} from '../../contracts/contaracts.ts';
import {useMap} from '../../hooks/use-map.ts';
import {ACTIVE_ICON, DEFAULT_ICON, MapTypeOffer} from '../../constants/constants.ts';
import {useAppSelector} from '../../hooks/store.ts';

type MapProps = {
  city: City;
  type: MapTypeOffer;
  offers: Offer[];
};

function Map(props: MapProps) {
  const {city, offers} = props;
  const interactive = (MapTypeOffer.Cities) === props.type;
  const mapRef = useRef(null);
  const map = useMap(mapRef, city, interactive);
  const selectedOfferId = useAppSelector((state) => state.offers.selectedOfferId);
  const selectedOffer = offers.find((offer) => offer.id === selectedOfferId);
  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        marker
          .setIcon((offer.id === selectedOffer?.id) ? ACTIVE_ICON : DEFAULT_ICON)
          .addTo(markerLayer);
      });
      if (selectedOffer?.id) {
        map.setView([selectedOffer.location.latitude, selectedOffer.location.longitude]);
      } else if (interactive) {
        map.setView([city.location.latitude,city.location.longitude],city.location.zoom);
      }
      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [interactive, map, offers,selectedOffer, city]);

  return(
    <section className={`${props.type} map`} ref={mapRef}/>
  );
}

export {Map};
