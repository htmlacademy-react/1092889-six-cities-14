import {convertRatingToPercent} from '../../utils/converters.ts';
import {ReviewForm} from '../review-form/review-form.tsx';
import {Comment} from '../../contracts/contaracts.ts';
import {formatDate, isPlural} from '../../utils/intl.ts';

interface ReviewsListProps {
  comments: Comment[];
}

const ReviewsList = ({comments}: ReviewsListProps) => (
  <section className="offer__reviews reviews">
    <h2 className="reviews__title">
      {isPlural(comments.length) ? 'Reviews' : 'Review' } · <span className="reviews__amount">{comments.length}</span>
    </h2>
    <ul className="reviews__list">
      {comments.map((comment: Comment) => (
        <li className="reviews__item" key={comment.id}>
          <div className="reviews__user user">
            <div className="reviews__avatar-wrapper user__avatar-wrapper">
              <img
                className="reviews__avatar user__avatar"
                src={comment.user.avatarUrl}
                width={54}
                height={54}
                alt="Reviews avatar"
              />
            </div>
            <span className="reviews__user-name">{comment.user.name}</span>
          </div>
          <div className="reviews__info">
            <div className="reviews__rating rating">
              <div className="reviews__stars rating__stars">
                <span style={{ width: `${convertRatingToPercent(comment.rating)}%`}}/>
                <span className="visually-hidden">Rating</span>
              </div>
            </div>
            <p className="reviews__text">
              {comment.comment}
            </p>
            <time className="reviews__time" dateTime={new Date(comment.date).toLocaleString()}>
              {formatDate(new Date(comment.date))}
            </time>
          </div>
        </li>
      ))}
    </ul>
    <ReviewForm />
  </section>
);

export {ReviewsList};

