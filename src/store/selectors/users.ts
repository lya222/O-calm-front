import * as jose from 'jose';

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
  } catch (error) {
    console.error('Erreur sur la verification du token:', error);
    throw error;
  }
};
