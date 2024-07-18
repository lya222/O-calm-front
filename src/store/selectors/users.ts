import * as jose from 'jose';
import { CreateUser, IResponseCreateUser } from '../../@types/user';
import axios from 'axios';

const url = import.meta.env.VITE_API_URL;

export const verifyAndDecodeToken = async (token: string) => {
  try {
    const secretKey = import.meta.env.VITE_API_SECRETKEYTOKEN;
    const secret = new TextEncoder().encode(secretKey);

    const { payload, protectedHeader } = await jose.jwtVerify(token, secret, {
      algorithms: ['HS256'],
    });

    console.log('Vérification réussi');
    console.log('Protected Header:', protectedHeader);
    console.log('Payload:', payload);

    return payload;
  } catch (err) {
    console.error('Erreur sur la verification du token:', err);
    throw err;
  }
};

//Création d'un nouvel utilisaeur
export const createUser = async (userData: CreateUser) => {
  console.log("mes donnes que je rentre pour l'enregistrement", userData);
  const response = await axios.post<IResponseCreateUser>(
    `${url}/register`,
    userData
  );
  return response.data;
};
