export interface User {
  id: number;
  pseudo: string;
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
}

export interface CreateUser {
  pseudo: string;
  password: string;
  email: string;
}
