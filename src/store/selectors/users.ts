import * as jose from 'jose';
import { CreateUser, IResponseCreateUser } from '../../@types/user';
import axios from 'axios';

const url = import.meta.env.VITE_API_URL;

export const verifyAndDecodeToken = async (token: string) => {
  try {
    const secretKey = import.meta.env.VITE_API_SECRETKEYTOKEN;
    const secret = new TextEncoder().encode(secretKey);

    const { payload } = await jose.jwtVerify(token, secret, {
      algorithms: ['HS256'],
    });

    return payload;
  } catch (err) {
    console.error('Erreur sur la verification du token:', err);
    throw err;
  }
};




//Création d'un nouvel utilisaeur
export const createUser = async (userData: CreateUser) => {
  const response = await axios.post<IResponseCreateUser>(
    `${url}/register`,
    userData
  );
  return response.data;
};
