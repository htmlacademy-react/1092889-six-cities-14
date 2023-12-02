import {useRef, useEffect} from 'react';
import {Marker, layerGroup} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {City, Offer} from '../../contracts/contaracts.ts';
import {useMap} from '../../hooks/useMap.ts';
import {ACTIVE_ICON, DEFAULT_ICON} from '../../constants/constants.ts';

type MapProps = {
  city: City;
  offers: Offer[];
  selectedOffer: string | undefined;
};

function Map(props: MapProps) {
  const {city, offers, selectedOffer} = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        marker
          .setIcon(
            selectedOffer !== undefined && offer.id === selectedOffer
              ? DEFAULT_ICON
              : ACTIVE_ICON
          )
          .addTo(markerLayer);
      });
      if (selectedOffer) {
        const offer = offers.find((el) => el.id === selectedOffer);
        map.setView([offer!.location.latitude, offer!.location.longitude]);
      } else {
        map.setView([city.location.latitude,city.location.longitude],city.location.zoom);
      }
      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedOffer, city]);

  return(
    <section className="cities__map map" ref={mapRef}/>
  );
}

export {Map};
