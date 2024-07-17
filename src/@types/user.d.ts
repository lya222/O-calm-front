import { IFavorite } from './Favorites';

export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
}

export interface UserState {
  isLogged: boolean;
  data: User[];
  loading: boolean;
  error: string | null | undefined;
  credentials: ICredentials;
  pseudo: string;
  id: number;
  favorite: IFavorite[];
}

export interface CreateUser {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  id?: string;
}

export interface IResponseCreateUser {
  message: string;
  newUser: number;
}
