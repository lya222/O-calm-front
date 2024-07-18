import MockAdapter from 'axios-mock-adapter';
import { createUser } from '../store/selectors/users';
import { afterEach, describe, expect, it } from 'vitest';
import apiClient from '../api/apiClient';
import { faker } from '@faker-js/faker';

// Création d'une instance Axios avec axios-mock-adapter
const mockAxios = new MockAdapter(apiClient);
const url = import.meta.env.VITE_API_URL;
const randomName = faker.internet.userName();
const randomEmail = faker.internet.email();

describe('createUser', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it('should create a user', async () => {
    // Données utilisateur de test
    const userData = {
      username: randomName,
      email: randomEmail,
      password: 'password123',
      passwordConfirm: 'password123',
    };

    // Réponse simulée de l'API
    const responseData = {
      message: 'User registered successfully',
      newUser: 9,
    };

    // Configurer le mock pour intercepter la requête POST et renvoyer la réponse simulée
    mockAxios.onPost(`${url}/register`, userData).reply(200, responseData);

    // Appeler la fonction createUser avec les données utilisateur
    try {
      const result = await createUser(userData);

      // Vérifier que la fonction renvoie une réponse avec un nombre pour newUser
      expect(result.newUser).toBeDefined();
      expect(typeof result.newUser).toBe('number');
    } catch (error) {
      // Afficher l'erreur pour débogage
      console.error('Error during createUser test:', error);
      throw error; // Rethrow the error to fail the test explicitly
    }
  });
});
