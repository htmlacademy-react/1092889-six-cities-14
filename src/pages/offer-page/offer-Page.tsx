import {convertRatingToPercent} from '../../utils/converters.ts';
import {useDocumentTitle} from '../../hooks/useDocumentTitle.ts';
import {ReviewsList} from '../../components/reviews-list/reviews-list.tsx';
import {Map} from '../../components/map/map.tsx';
import {MAP_TYPE_CLASS, REQUEST_STATUS} from '../../constants/constants.ts';
import {isPlural} from '../../utils/intl.ts';
import {store} from '../../store/store.ts';
import {fetchComments} from '../../store/slices/comments.ts';
import {Spinner} from '../../components/spinner/spinner.tsx';
import {fetchNearOffers, fetchOffer} from '../../store/slices/offers.ts';
import {NearPlaces} from '../../components/near-places/nearPlaces.tsx';
import {useAppSelector} from '../../hooks/store.ts';
import {Offer} from '../../contracts/contaracts.ts';
import {Params} from 'react-router-dom';

const OfferPage = () => {
  useDocumentTitle('Offer');
  const nearOffers = useAppSelector((state) => state.offers.nearOffers).slice(0,3);
  const offer = useAppSelector((state) => state.offers.selectedOffer);
  const comments = useAppSelector((state) => state.comments.comments);
  const city = useAppSelector((state) => state.city);
  const requestStatus = useAppSelector((state) => state.offers.requestStatus);
  const CityInfo = city.cities.find((el) => el.name === city.city)!;
  return (

    <main className="page__main page__main--offer">
      {((offer === null || offer === undefined)) ?
        <Spinner /> : (
          <section className="offer">
            <div className="offer__gallery-container container">
              <div className="offer__gallery">
                {offer.images.map((image) => (
                  <div className="offer__image-wrapper" key={image}>
                    <img className="offer__image"
                      src={image}
                      alt="Photo studio"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="offer__container container">
              <div className="offer__wrapper">
                {((offer.isPremium) ?
                  <div className="offer__mark">
                    <span>Premium</span>
                  </div> : '')}
                <div className="offer__name-wrapper">
                  <h1 className="offer__name">
                    {offer.title}
                  </h1>
                  <button className="offer__bookmark-button button" type="button">
                    <svg className="offer__bookmark-icon" width={31} height={33}>
                      <use xlinkHref="#icon-bookmark"/>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="offer__rating rating">
                  <div className="offer__stars rating__stars">
                    <span style={{ width: `${convertRatingToPercent(offer.rating)}%`}}/>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="offer__rating-value rating__value">{offer.rating}</span>
                </div>
                <ul className="offer__features">
                  <li className="offer__feature offer__feature--entire">{offer.type}</li>
                  <li className="offer__feature offer__feature--bedrooms">
                    {`${offer.bedrooms} ${isPlural(offer.bedrooms) ? 'Bedrooms' : 'Bedroom'}`}
                  </li>
                  <li className="offer__feature offer__feature--adults">
                    Max {`${offer.maxAdults} ${isPlural(offer.maxAdults) ? 'adults' : 'adult'}`}
                  </li>
                </ul>
                <div className="offer__price">
                  <b className="offer__price-value">€{offer.price}</b>
                  <span className="offer__price-text">&nbsp;night</span>
                </div>
                <div className="offer__inside">
                  <h2 className="offer__inside-title">{'What\'s inside'}</h2>
                  <ul className="offer__inside-list">
                    {offer.goods.map((goods) => (<li className="offer__inside-item" key={goods}>{goods}</li>))}
                  </ul>
                </div>
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <div className="offer__host-user user">
                    <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                      <img
                        className="offer__avatar user__avatar"
                        src={offer.host.avatarUrl}
                        width={74}
                        height={74}
                        alt="User avatar"
                      />
                    </div>
                    <span className="offer__user-name">{offer.host.name}</span>
                    {(offer.host.isPro) ? <span className="offer__user-status">Pro</span> : ''}
                  </div>
                  <div className="offer__description">
                    <p className="offer__text">
                      {offer.description}
                    </p>
                  </div>
                </div>
                {(store.getState().comments.requestStatus === REQUEST_STATUS.PENDING) ? <Spinner /> : <ReviewsList comments={comments}/>}
              </div>
            </div>
            {(nearOffers.length === 0) ? <Spinner /> :
              <Map city={CityInfo} type={MAP_TYPE_CLASS.OFFER} offers={[...nearOffers, {...offer, previewImage: ''} as Offer]}/>}
          </section>
        )}
      {(nearOffers.length === 0 || requestStatus === REQUEST_STATUS.PENDING) ? <Spinner /> :
        <div className="container">
          <NearPlaces nearOffers={nearOffers} onSelectHandler={() => {}}/>
        </div>}

    </main>
  );
};

const loader = ({id}: Params<string>) => {
  const {selectedOffer} = store.getState().offers;
  if (!selectedOffer) {
    store.dispatch(fetchOffer(id!));
  } else if(selectedOffer.id !== id!) {
    store.dispatch(fetchOffer(id!));
  }
  store.dispatch(fetchComments(id!));
  store.dispatch(fetchNearOffers(id!));
  return null;
};

export {loader, OfferPage};
