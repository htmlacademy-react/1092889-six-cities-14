import {City, Offer} from '../../contracts/contaracts.ts';
import {Card} from '../../components/card/card.tsx';
import {Tabs} from '../../components/tabs/tabs.tsx';
import {Fragment, useEffect, useState} from 'react';
import {Map} from '../../components/map/map.tsx';
import {CITY_SORT_TYPE, CitySorts, MAP_TYPE_CLASS, REQUEST_STATUS} from '../../constants/constants.ts';
import {isPlural} from '../../utils/intl.ts';
import {CardSort} from '../../components/card-sort/card-sort.tsx';
import {fetchAllOffers, fetchOffer} from '../../store/slices/offers.ts';
import {store} from '../../store/store.ts';
import {Spinner} from '../../components/spinner/spinner.tsx';
import {EmptyMain} from '../../components/empty-main/empty-main.tsx';
import {useAppSelector} from '../../hooks/store.ts';

interface MainPageProps {
  city: City;
}

const MainPage = ({city}: MainPageProps) => {
  const [sortType, setSortType] = useState(CITY_SORT_TYPE.POPULAR);
  const offers = useAppSelector((state) => state.offers.offers);
  const selectedOffer = useAppSelector((state) => state.offers.selectedOffer);
  const filteredOffers = offers.filter((offer) => offer.city.name === city.name);
  const currentOffers = (sortType === CITY_SORT_TYPE.POPULAR) ? [...filteredOffers] : [...filteredOffers].sort(CitySorts.get(sortType)!.sortFn);
  const selectedCard = selectedOffer?.id;

  useEffect(() => {
    if (document.title !== city.name) {
      document.title = city.name;
    }
    setSortType(CITY_SORT_TYPE.POPULAR);
  },[city]);

  const handleSelectedCard = (id: string | null) => {
    if (selectedCard !== id && id !== null){
      store.dispatch(fetchOffer(id));
    }
  };

  const handleSortChange = (type: CITY_SORT_TYPE) => {
    setSortType(type);
  };

  return (
    <div className="page page--gray page--main">
      <main className={`page__main page__main--index ${(currentOffers.length === 0 && store.getState().offers.requestStatus !== REQUEST_STATUS.PENDING) ? 'page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <Tabs/>
        <div className="cities">
          {(currentOffers.length === 0 && store.getState().offers.requestStatus !== REQUEST_STATUS.PENDING) ? <EmptyMain city={city.name} /> :
            <div className="cities__places-container container">
              <section className="cities__places places">
                {(currentOffers.length === 0) ? <Spinner /> :
                  <Fragment>
                    <h2 className="visually-hidden">Places</h2>
                    <b className="places__found">{`${currentOffers.length} ${isPlural(currentOffers.length) ? 'places' : 'place'} to stay in ${city.name}`}</b>
                    <CardSort currentSort={sortType} onSortChange={handleSortChange}/>
                    <div className="cities__places-list places__list tabs__content">
                      {currentOffers.map((el: Offer) => <Card key={el.id} cardType={'City'} onSelect={handleSelectedCard} {...el}/>)}
                    </div>
                  </Fragment>}
              </section>
              <div className="cities__right-section">
                <Map city={city} offers={currentOffers} type={MAP_TYPE_CLASS.CITY} />
              </div>
            </div>}
        </div>
      </main>
    </div>
  );
};

const loader = () => {
  const {offers} = store.getState();
  if(offers.requestStatus === REQUEST_STATUS.IDLE || (offers.requestStatus === REQUEST_STATUS.FULFILLED && offers.offers.length === 0)) {
    store.dispatch(fetchAllOffers());
  }
  return null;

};
export {loader, MainPage};
