import {CITY_SORT_TYPE, CITY_SORTS} from '../../constants/constants.ts';
import {useState} from 'react';

interface CardSortProps {
  currentSort: CITY_SORT_TYPE;
  onSortChange: (sortType: CITY_SORT_TYPE) => void;
}

const CardSort = ({currentSort, onSortChange}: CardSortProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const handleSortChange = (key: CITY_SORT_TYPE) => {
    setIsOpened(!isOpened);
    onSortChange(key);
  };

  const toggleIsOpened = () => {
    setIsOpened(!isOpened);
  };
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={toggleIsOpened}>
        {`${CITY_SORTS.get(currentSort)!.name}`}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select"/>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${(isOpened) ? 'places__options--opened' : ''}`}>
        {Array.from(CITY_SORTS).map(([sortKey, value]) => (
          <li
            className={`places__option ${(sortKey === currentSort) ? 'places__option--active' : ''}`}
            tabIndex={0}
            key={sortKey}
            onClick={() => handleSortChange(sortKey)}
          >
            {value.name}
          </li>))}
      </ul>
    </form>
  );
};

export {CardSort};


