export interface Places {
  id: number;
  name: string;
  gpsLocation: string;
  userId: number;
  journey: string;
  slug: string;
  description: string;
  picture: string[];
}

export interface Tag {
  id: number;
  name: string;
  color: string;
}

export interface PlacesState {
  list: Places[];
  loading: boolean;
  error: string | undefined | null;
  search: string;
}

export interface IFormInputPlace {
  name: string;
  slug: string;
  description: string;
  images: string[];
  tag: Tag[];
  route: string[];
}
