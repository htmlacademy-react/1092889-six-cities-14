type LocationInfo = {
  latitude: number;
  longitude: number;
  zoom: number;
}

type City = {
  name: string;
  location: LocationInfo;
}

type Host = {
  id:number;
  name:string;
  isPro:boolean;
  avatarUrl:string;
}

type Offer = {
  id: number;
  city: City;
  previewImage: string;
  images: string[];
  title: string;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  type: string;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: string[];
  host:Host;
  description: string;
  location: LocationInfo;
};

export type {Host, LocationInfo, Offer, City};

