import {City, Offer} from '../../contracts/contaracts.ts';
import {Card} from '../../components/card/card.tsx';
import {Tabs} from '../../components/tabs/tabs.tsx';
import {useLoaderData} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {Map} from '../../components/map/map.tsx';
import {CITY_SORT_TYPE, CitySorts, MAP_TYPE_CLASS} from '../../constants/constants.ts';
import {isPlural} from '../../utils/intl.ts';
import {CardSort} from '../../components/card-sort/card-sort.tsx';

interface MainPageProps {
  city: City;
}
const MainPage = ({city}: MainPageProps) => {
  const [sortType, setSortType] = useState(CITY_SORT_TYPE.POPULAR);
  const offersState = useLoaderData() as Offer[];
  const offers = (sortType === CITY_SORT_TYPE.POPULAR) ? [...offersState] : [...offersState].sort(CitySorts.get(sortType)!.sortFn);
  const [selectedCard, setSelectedCard] = useState('');
  useEffect(() => {
    if (document.title !== city.name) {
      document.title = city.name;
    }
    setSortType(CITY_SORT_TYPE.POPULAR);
  },[city]);

  const handleSelectedCard = (id: string) => {
    setSelectedCard(id);
  };

  const handleSortChange = (type: CITY_SORT_TYPE) => {
    setSortType(type);
  };

  return (
    <div className="page page--gray page--main">
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <Tabs/>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{`${offers.length} ${isPlural(offers.length) ? 'places' : 'place'} to stay in ${city.name}`}</b>
              <CardSort currentSort={sortType} onSortChange={handleSortChange}/>
              <div className="cities__places-list places__list tabs__content">
                {offers.map((el: Offer) => <Card key={el.id} cardType={'City'} onSelect={handleSelectedCard} {...el}/>)}
              </div>
            </section>
            <div className="cities__right-section">
              <Map city={city} offers={offers} type={MAP_TYPE_CLASS.CITY} selectedOffer={selectedCard} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const loader = (offers: Offer[], city: string): Offer[] => offers.filter((offer: Offer) => offer.city.name === city);
export {loader, MainPage};

