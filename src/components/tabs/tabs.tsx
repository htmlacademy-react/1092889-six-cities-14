import {Cities} from '../../constants/constants.ts';
import {NavLink} from 'react-router-dom';
import clsx from 'clsx';

export const Tabs = () => (
  <div className="tabs">
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {Cities.map((city) => (
          <li className="locations__item" key={city.name}>
            <NavLink to={`/${city.name}`} className={({isActive}) =>
              clsx(
                'locations__item-link',
                {
                  'tabs__item--active': isActive,
                },
                'tabs__item')}
            >
              <span>{city.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </section>
  </div>
);
