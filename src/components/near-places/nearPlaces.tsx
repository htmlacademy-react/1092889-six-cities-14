import {Offer} from '../../contracts/contaracts.ts';
import {Card} from '../card/card.tsx';
import {useAppSelector} from '../../hooks/store.ts';

interface NearPlacesProps {
  onSelectHandler: (id: Offer['id'] | null) => void;
}
const NearPlaces = (props: NearPlacesProps) => {
  const nearOffers = useAppSelector((state) => state.offers.nearOffers).slice(0,3);


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
