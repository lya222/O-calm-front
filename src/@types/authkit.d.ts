export interface SignInActionPayload<T> {
  token: string;
  expiresIn: number;
  tokenType: string;
  auth: {
    token: string;
    type?: string;
  };
  authState: {
    email: T;
  };
}

export interface ICookies {
  token: string;
  userFound: number;
}
