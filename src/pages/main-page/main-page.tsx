import {City, Offer} from '../../contracts/contaracts.ts';
import {Card} from '../../components/card/card.tsx';
import {Tabs} from '../../components/tabs/tabs.tsx';
import {Fragment, useEffect, useMemo, useState} from 'react';
import {Map} from '../../components/map/map.tsx';
import {CitySortType, CITY_SORTS, MapTypeOffer, RequestStatus} from '../../constants/constants.ts';
import {isPlural} from '../../utils/intl.ts';
import {CardSort} from '../../components/card-sort/card-sort.tsx';
import {fetchAllOffers, fetchOffer} from '../../store/slices/offers.ts';
import {store} from '../../store/store.ts';
import {Spinner} from '../../components/spinner/spinner.tsx';
import {EmptyMain} from '../../components/empty-main/empty-main.tsx';
import {useAppSelector} from '../../hooks/store.ts';
import {debounce} from '../../utils/debounce.ts';

interface MainPageProps {
  city: City;
}

const MainPage = ({city}: MainPageProps) => {
  const [sortType, setSortType] = useState(CitySortType.Popular);
  const offers = useAppSelector((state) => state.offers.offers);
  const selectedOffer = useAppSelector((state) => state.offers.selectedOffer);
  const filteredOffers = useMemo(() => offers.filter((offer) => offer.city.name === city.name), [offers, city]);
  const currentOffers = useMemo(() => (sortType === CitySortType.Popular) ? filteredOffers : filteredOffers.sort(CITY_SORTS.get(sortType)!.sortFn), [sortType, filteredOffers]);
  const selectedCard = selectedOffer?.id;
  const dispatchOffer = (id: string) => {
    store.dispatch(fetchOffer(id));
  };
  const debouncedFetchOffer = debounce(dispatchOffer, 500);
  useEffect(() => {
    if (document.title !== city.name) {
      document.title = city.name;
    }
    setSortType(CitySortType.Popular);
  },[city]);

  const handleSelectedCard = (id: string | null) => {
    if (selectedCard !== id && id !== null){
      debouncedFetchOffer(id);
    }
  };

  const handleSortChange = (type: CitySortType) => {
    setSortType(type);
  };

  return (
    <div className="page page--gray page--main">
      <main className={`page__main page__main--index ${(currentOffers.length === 0 && store.getState().offers.requestStatus !== RequestStatus.Pending) ? 'page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <Tabs/>
        <div className="cities">
          {(currentOffers.length === 0 && store.getState().offers.requestStatus !== RequestStatus.Pending) ? <EmptyMain city={city.name} /> :
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
                <Map city={city} offers={currentOffers} type={MapTypeOffer.Cities} />
              </div>
            </div>}
        </div>
      </main>
    </div>
  );
};

const loader = () => {
  const {offers} = store.getState();
  if(offers.requestStatus === RequestStatus.Idle || (offers.requestStatus === RequestStatus.Fulfilled && offers.offers.length === 0)) {
    store.dispatch(fetchAllOffers());
  }
  return null;

};
export {loader, MainPage};
