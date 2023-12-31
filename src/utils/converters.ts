const enum Default {
  MAX_RATING = 5,
  MAX_PERCENT = 100,
}

const convertRatingToPercent = (value: number) => ((Math.round(value) / Default.MAX_RATING) * Default.MAX_PERCENT);

export {convertRatingToPercent};

