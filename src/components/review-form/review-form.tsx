import {FormEvent, useState} from 'react';
import {Fragment} from 'react';
import {useAppSelector} from '../../hooks/store.ts';
import {REQUEST_STATUS} from '../../constants/constants.ts';
import {store} from '../../store/store.ts';
import {sendComment} from '../../store/slices/comments.ts';

const ReviewForm = () => {
  const [review, setReview] = useState({
    comment: '',
    rating: 0,
  });

  const requestStatus = useAppSelector((state) => state.comments.requestStatus);
  const selectedOfferId = useAppSelector((state) => state.offers.selectedOffer!.id);

  const ratingTable = [
    {id: '5-stars', value: 5, title: 'perfect'},
    {id: '4-stars', value: 4, title: 'good'},
    {id: '3-stars', value: 3, title: 'not bad'},
    {id: '2-stars', value: 2, title: 'badly'},
    {id: '1-star', value: 1, title: 'terribly'}
  ];
  const isValid = () => ((review.rating >= 1 && review.comment.length >= 50 && review.comment.length <= 300));
  const handleRatingChange = (evt : React.ChangeEvent<HTMLInputElement>) => {
    if (Number(evt.target.value) === review.rating) {
      return;
    }
    setReview({...review ,rating: Number(evt.target.value)});
  };
  const handleInputChange = (evt : React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview({...review, comment: evt.target.value});
  };

  const handleFormSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    const form = evt.target as HTMLFormElement;
    form.reset();
    store.dispatch(sendComment({comment:review, offerId: selectedOfferId}));
    setReview({
      comment: '',
      rating: 0,});
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {ratingTable.map((ratingValue) => (
          <Fragment key = {ratingValue.id}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              defaultValue={ratingValue.value}
              id={ratingValue.id}
              type="radio"
              onChange={handleRatingChange}
            />
            <label
              htmlFor={ratingValue.id}
              className="reviews__rating-label form__rating-label"
              title={ratingValue.title}
            >
              <svg className="form__star-image" width={37} height={33}>
                <use xlinkHref="#icon-star"/>
              </svg>
            </label>
          </Fragment>))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="comment"
        name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
        defaultValue={review.comment}
        onChange={handleInputChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your
          stay with at least{' '}
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isValid() || requestStatus === REQUEST_STATUS.PENDING}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export {ReviewForm};

