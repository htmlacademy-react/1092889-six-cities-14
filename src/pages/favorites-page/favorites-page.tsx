import React from 'react';
import {useDocumentTitle} from '../../hooks/useDocumentTitle.ts';
import {Offer} from '../../contracts/contaracts.ts';
import {useLoaderData} from 'react-router-dom';
import {Card} from '../../components/card/card.tsx';

type GroupedOffers = {[k:string]: Offer[]}


const FavoritesPage = () => {
  useDocumentTitle('Favorites');
  const offers = useLoaderData() as Offer[];
  const groupedOffers = Array.from(Object.entries(offers.reduce((arr: GroupedOffers , curr: Offer) => {
    (arr[curr.city['name']] = arr[curr.city['name']] || []).push(curr);
    return arr;
  }, {})));
  return (
    <React.Fragment>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {groupedOffers.map((group: [string,Offer[]]) => (
                <li className="favorites__locations-items" key={group[0]}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{group[0]}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {group[1].map((offer) => (
                      <Card key={offer.id}
                        cardType={'Favorites'}
                        {...offer}
                        onSelect={() => {
                        }}
                      />))}
                  </div>
                </li>))}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width={64}
            height={33}
          />
        </a>
      </footer>
    </React.Fragment>
  );
};

const loader = (offers: Offer[]) => offers.filter((offer) => offer.isFavorite);


export {FavoritesPage, loader};

