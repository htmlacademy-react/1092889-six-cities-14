import {convertRatingToPercent} from '../../utils/converters.ts';
import {useDocumentTitle} from '../../hooks/use-document-title.ts';
import {ReviewsList} from '../../components/reviews-list/reviews-list.tsx';
import {Map} from '../../components/map/map.tsx';
import {
  AppRoute,
  AuthorizationStatus,
  FavoriteStatus,
  MapTypeOffer,
  RequestStatus
} from '../../constants/constants.ts';
import {isPlural} from '../../utils/intl.ts';
import {store} from '../../store/store.ts';
import {Spinner} from '../../components/spinner/spinner.tsx';
import {NearPlaces} from '../../components/near-places/near-places.tsx';
import {useAppSelector} from '../../hooks/store.ts';
import {Offer} from '../../contracts/contaracts.ts';
import {useNavigate} from 'react-router-dom';
import {changeFavoriteStatus} from '../../store/slices/favorites.ts';
import clsx from 'clsx';
import {Fragment} from 'react';

const OfferPage = () => {
  useDocumentTitle('Offer');
  const nearOffers = useAppSelector((state) => state.offers.nearOffers);
  const offer = useAppSelector((state) => state.offers.selectedOffer);
  const comments = useAppSelector((state) => state.comments.comments);
  const city = useAppSelector((state) => state.city);
  const requestStatus = useAppSelector((state) => state.offers.requestStatus);
  const CityInfo = city.cities.find((el) => el.name === city.city)!;
  const auth = useAppSelector((state) => state.authentication.status);
  const navigate = useNavigate();

  if (requestStatus === RequestStatus.Rejected) {
    navigate('*');
  }
  const handleBookmarkButton = () => {
    const statusToChange = (offer!.isFavorite) ? FavoriteStatus.Not_Favorite : FavoriteStatus.Favorite;
    if(auth === AuthorizationStatus.Authorized) {
      store.dispatch(changeFavoriteStatus({offerId: offer!.id, status: statusToChange}));
    } else {
      navigate(AppRoute.Login);
    }
  };
  return (

    <main className="page__main page__main--offer">
      {(offer === null || offer === undefined) ?
        <Spinner /> : (
          <Fragment>
            <section className="offer">
              <div className="offer__gallery-container container">
                <div className="offer__gallery">
                  {offer.images.slice(0,6).map((image) => (
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
                    <button className={clsx('offer__bookmark-button', {'offer__bookmark-button--active' : offer.isFavorite} ,'button')} type="button" onClick={handleBookmarkButton}>
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
                      <div className={clsx('offer__avatar-wrapper', {'offer__avatar-wrapper--pro': offer.host.isPro}, 'user__avatar-wrapper')}>
                        <img
                          className="offer__avatar user__avatar"
                          src={offer.host.avatarUrl}
                          width={74}
                          height={74}
                          alt="User avatar"
                        />
                      </div>
                      <span className="offer__user-name">{offer.host.name}</span>
                      {(offer.host.isPro) ? <span className="offer__user-status">Pro</span> : ' '}
                    </div>
                    <div className="offer__description">
                      <p className="offer__text">
                        {offer.description}
                      </p>
                    </div>
                  </div>
                  {(store.getState().comments.requestStatus === RequestStatus.Pending) ? <Spinner /> : <ReviewsList comments={comments}/>}
                </div>
              </div>
              {(nearOffers.length === 0) ? <Spinner /> :
                <Map city={CityInfo} type={MapTypeOffer.Offers} offers={[...nearOffers.slice(0,3), {...offer, previewImage: ''} as Offer]}/>}
            </section>
            <div className="container">
              <NearPlaces onSelectHandler={() => {}}/>
            </div>
          </Fragment>)}
    </main>
  );
};

export {OfferPage};

