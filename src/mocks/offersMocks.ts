import {City, User, LocationInfo, Offer, DetailedOffer, Comment} from '../contracts/contaracts.ts';
import {faker} from '@faker-js/faker';
import {Cities, OfferTypes} from '../constants/constants.ts';
const mockLocation = (location: LocationInfo): LocationInfo => ({
  latitude: faker.number.float({min: location.latitude - 0.05, max: location.latitude + 0.05, precision: 0.01}),
  longitude:faker.number.float({min: location.longitude - 0.05, max: location.longitude + 0.05, precision: 0.01}),
  zoom: 12});

const mockCity = (): City => (faker.helpers.arrayElement(Cities));

const mockUser = (): User => ({
  isPro: faker.datatype.boolean(),
  name: faker.person.firstName(),
  avatarUrl: faker.image.urlLoremFlickr({category:'person'})
});

const mockOffer = (id: string): DetailedOffer & Pick<Offer, 'previewImage'> => {
  const city = mockCity();
  return ({
    city: city,
    previewImage: faker.image.urlLoremFlickr({category: 'room'}),
    images: Array.from({length: faker.number.int(15)}, () => faker.image.urlLoremFlickr({category:'room'})),
    title: faker.company.catchPhrase(),
    isFavorite: faker.datatype.boolean(),
    isPremium: faker.datatype.boolean(),
    rating: faker.number.float({min: 0, max: 5, precision: 0.01}),
    type: faker.helpers.arrayElement(OfferTypes),
    bedrooms: faker.number.int(3),
    maxAdults: faker.number.int(6),
    price: faker.number.int(1000),
    goods: Array.from({length: faker.number.int(15)}, () => faker.commerce.productName()),
    host: mockUser(),
    description: faker.word.words(5),
    location: mockLocation(city.location),
    id: id,
  });
};

const mockComment = (): Comment => ({
  id: crypto.randomUUID(),
  comment: faker.lorem.words({min: 1, max: 10}),
  date: faker.date.anytime().toISOString(),
  user: mockUser(),
  rating: faker.number.int({min: 1,max: 5})
});

const getOffersMocks = (amount: number) => Array.from({length: amount}, () => mockOffer(crypto.randomUUID()));
const getComments = () => Array.from({length: faker.number.int({min: 1, max: 10})}, () => mockComment());

export {getOffersMocks, getComments};
