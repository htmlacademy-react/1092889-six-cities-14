import {useState} from 'react';
import {Fragment} from 'react';

const ReviewForm = () => {
  const [comment, setRating] = useState({
    text: '',
    rating: 0,
    isValid: false
  });

  const ratingTable = [
    {id: '5-stars', value: 5, title: 'perfect'},
    {id: '4-stars', value: 4, title: 'good'},
    {id: '3-stars', value: 3, title: 'not bad'},
    {id: '2-stars', value: 2, title: 'badly'},
    {id: '1-star', value: 1, title: 'terribly'}
  ];
  const isValid = () => ((comment.rating >= 1 && comment.text.length >= 50));
  const handleRatingChange = (evt : React.ChangeEvent<HTMLInputElement>) => {
    if (Number(evt.target.value) === comment.rating) {
      return;
    }
    setRating({...comment ,rating: Number(evt.target.value), isValid: isValid()});
  };
  const handleInputChange = (evt : React.ChangeEvent<HTMLTextAreaElement>) => {
    setRating({...comment, text: evt.target.value, isValid: isValid()});
  };

  return (
    <form className="reviews__form form" action="#" method="post">
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
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        defaultValue={''}
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
          disabled={!comment.isValid}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export {ReviewForm};

