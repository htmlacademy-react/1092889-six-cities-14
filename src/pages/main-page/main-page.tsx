import {Offer} from '../../contracts/contaracts.ts';
import {Card} from '../../components/card/card.tsx';
import {Tabs} from '../../components/tabs/tabs.tsx';
import {useLoaderData} from 'react-router-dom';
import {useEffect, useState} from 'react';

interface MainPageProps {
  city: string;
}
const MainPage = (props: MainPageProps) => {
  const offers = useLoaderData() as Offer[];
  const [, setSelectedCard] = useState('');
  useEffect(() => {
    if (document.title !== props.city) {
      document.title = props.city;
    }
  });
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
              <b className="places__found">{offers.length} places to stay in {props.city}</b>
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
              <section className="cities__map map"/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const loader = (offers: Offer[], city: string): Offer[] => offers.filter((el: Offer) => el.city.name === city);
export {loader, MainPage};

