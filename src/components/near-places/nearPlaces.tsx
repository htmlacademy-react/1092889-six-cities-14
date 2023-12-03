import {Offer} from '../../contracts/contaracts.ts';
import {Card} from '../card/card.tsx';

interface NearPlacesProps {
  nearOffers: Offer[];
  onSelectHandler: (id: Offer['id']) => void;
}
const NearPlaces = (props: NearPlacesProps) => {
  const nearOffers = props.nearOffers;

  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {nearOffers.map((offer) => (<Card key={offer.id} {...offer} onSelect={props.onSelectHandler} cardType={'Near-Places'}/>))}
      </div>
    </section>
  );
};

export {NearPlaces};
