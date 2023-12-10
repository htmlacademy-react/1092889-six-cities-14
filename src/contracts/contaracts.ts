import {FavoriteStatus} from '../constants/constants.ts';

type LocationInfo = {
  latitude: number;
  longitude: number;
  zoom: number;
}

type City = {
  name: string;
  location: LocationInfo;
}

type User = {
  name:string;
  isPro:boolean;
  avatarUrl:string;
  token: string;
  email: string;
}

type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: LocationInfo;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
}

type DetailedOffer = Omit<Offer, 'previewImage'> & {
  description: string;
  bedrooms: number;
  goods: string[];
  host: User;
  images: string[];
  maxAdults: number;
}

type Comment = {
  id: string;
  date: string;
  user: User;
  comment: string;
  rating: number;
}

type LoginCredentials = {
  email: string;
  password: string;
}

type CommentData = {
  comment: string;
  rating: number;
}
type FavoriteStatusChangePayload = {
  offerId: Offer['id'];
  status: FavoriteStatus;
}

type SendCommentPayload = {
  offerId: Offer['id'];
  comment: CommentData;
}

export type {
  User,
  LocationInfo,
  Offer,
  City,
  DetailedOffer,
  Comment,
  LoginCredentials,
  CommentData,
  FavoriteStatusChangePayload,
  SendCommentPayload
};

