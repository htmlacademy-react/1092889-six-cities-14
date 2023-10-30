import {City, Host, LocationInfo, Offer} from '../contracts/contaracts.ts';
import {faker} from '@faker-js/faker';
const mockLocation = (): LocationInfo => ({
  latitude: faker.location.latitude(),
  longitude:faker.location.longitude(),
  zoom: faker.number.int(16)});

const mockCity = (): City => ({
  name: faker.location.city(),
  location: mockLocation()
});

const mockHost = (): Host => ({
  id: faker.number.int(100),
  isPro: faker.datatype.boolean(),
  name: faker.person.firstName(),
  avatarUrl: faker.internet.url()
});

const initId = () => {
  let id = 0;
  return () => id++;
};
const mockOffer = (id: number): Offer => {
  const city = mockCity();
  return ({
    city: city,
    previewImage: faker.image.urlLoremFlickr({category: 'room'}),
    images: Array.from({length: faker.number.int(15)}, () => faker.image.urlLoremFlickr({category:'room'})),
    title: faker.company.catchPhrase(),
    isFavorite: faker.datatype.boolean(),
    isPremium: faker.datatype.boolean(),
    rating: faker.number.float({min: 0, max: 5, precision: 0.01}),
    type: faker.location.secondaryAddress(),
    bedrooms: faker.number.int(3),
    maxAdults: faker.number.int(6),
    price: faker.number.int(1000),
    goods: Array.from({length: faker.number.int(15)}, () => faker.commerce.productName()),
    host: mockHost(),
    description: faker.word.words(5),
    location: city.location,
    id: id,
  });
};

export const getOffersMocks = (amount: number) => {
  const getNextId = initId();
  return Array.from({length: amount}, () => mockOffer(getNextId()));
};

