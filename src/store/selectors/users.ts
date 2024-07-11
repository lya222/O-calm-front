import * as jose from 'jose';

export const decryptToken = async (data: string) => {
  try {
    const secretKey = '51643d1229b9a2ec61faa0b2d77210'; // Your base64url-encoded key
    const secret = jose.base64url.decode(secretKey);
    const jwt = data;

    const { payload, protectedHeader } = await jose.jwtVerify(jwt, secret);

    console.log('Verification successful');
    console.log('Protected Header:', protectedHeader);
    console.log('Payload:', payload);

    return payload; // Return the payload if needed
  } catch (error) {
    console.error('Error verifying token:', error);
  }
};
