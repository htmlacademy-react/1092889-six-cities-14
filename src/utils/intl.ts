const isPlural = (count: number) => (new Intl.PluralRules('en-us',).select(count) !== 'one');
const formatDate = (date: Date) => new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric'
}).format(date);

export {isPlural, formatDate};


