import {City, Offer} from '../../contracts/contaracts.ts';
import {Card} from '../../components/card/card.tsx';
import {Tabs} from '../../components/tabs/tabs.tsx';
import {useLoaderData} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {Map} from '../../components/map/map.tsx';
import {MAP_TYPE_CLASS} from '../../constants/constants.ts';
import {isPlural} from '../../utils/intl.ts';
interface MainPageProps {
  city: City;
}
const MainPage = ({city}: MainPageProps) => {
  const offers = useLoaderData() as Offer[];
  const [selectedCard, setSelectedCard] = useState('');
  useEffect(() => {
    if (document.title !== city.name) {
      document.title = city.name;
    }
  },[city]);
  const handleSelectedCard = (id: string) => {
    setSelectedCard(id);
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
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                    Popular
                  <svg className="places__sorting-arrow" width={7} height={4}>
                    <use xlinkHref="#icon-arrow-select"/>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li
                    className="places__option places__option--active"
                    tabIndex={0}
                  >
                    Popular
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: low to high
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: high to low
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Top rated first
                  </li>
                </ul>
              </form>
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

