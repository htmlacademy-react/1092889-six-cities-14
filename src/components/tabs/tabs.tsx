import {NavLink} from 'react-router-dom';
import clsx from 'clsx';
import {useActionCreators, useAppSelector} from '../../hooks/store.ts';
import {cityActions} from '../../store/slices/city.ts';

export const Tabs = () => {
  const cityState = useAppSelector((store) => store.city);
  const {changeCity} = useActionCreators(cityActions);
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cityState.cities.map((city) => (
            <li className="locations__item" key={city.name}>
              <NavLink onChange={() => changeCity(city.name)} to={`/${city.name}`} className={({isActive}) =>
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
};
