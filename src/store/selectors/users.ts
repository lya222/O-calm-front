import * as jose from 'jose';

export const verifyAndDecodeToken = async (token: string) => {
  try {
    const secretKey = '51643d1229b9a2ec61faa0b2d77210';
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
