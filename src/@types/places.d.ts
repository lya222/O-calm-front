import { IPictureDownload } from './Files';

export interface Places {
  id: number;
  name: string;
  gps_location_latitude: string;
  gps_location_longitude: string;
  user_id: number;
  journey: string[];
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
  picture: IPictureDownload;
}

export interface IFormInputPlace {
  name: string;
  slug: string;
  description: string;
  picture: string[];
  // tag: Tag[];
  journey: string[];
  user_id: number;
}

export interface ICreatePlace {
  name: string;
  journey: string[];
  description: string;
  user_id: number;
  picture: string[];
  slug: string;
  gps_location_latitude: number;
  gps_location_longitude: number;
}
