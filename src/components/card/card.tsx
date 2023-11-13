import {Offer} from '../../contracts/contaracts.ts';
import {convertRatingToPercent} from '../../utils/converters.ts';
import {Link} from 'react-router-dom';

type CardProps = Pick<Offer,
  'isPremium'
| 'isFavorite'
| 'previewImage'
| 'id'
| 'title'
| 'price'
| 'rating'
| 'type'>
export const Card = (props: CardProps) => (
  <article className="cities__card place-card">
    {props.isPremium ? <div className="place-card__mark"><span>Premium</span></div> : ''}
    <div className="cities__image-wrapper place-card__image-wrapper">
      <Link to={'/offer/' + props.id.toString()}>
        <img
          className="place-card__image"
          src={props.previewImage}
          width={260}
          height={200}
          alt={props.title}
        />
      </Link>
    </div>
    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">€{props.price}</b>
          <span className="place-card__price-text">/&nbsp; night</span>
        </div>
        <button
          className={`place-card__bookmark button${ (props.isFavorite) ? ' place-card__bookmark-button--active' : ''} button`}
          type="button"
        >
          <svg className="place-card__bookmark-icon" width={18} height={19}>
            <use xlinkHref="#icon-bookmark" />
          </svg>
          <span className="visually-hidden">In bookmarks</span>
        </button>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{ width: `${convertRatingToPercent(props.rating)}%`}} />
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <Link to={'/offer/' + props.id.toString()}>{props.title}</Link>
      </h2>
      <p className="place-card__type">{props.type}</p>
    </div>
  </article>
);
