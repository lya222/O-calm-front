import {
  PayloadAction,
  Reducer,
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import { User, UserState } from '../../@types/user';
import { ICredentials } from '../../@types/Icredentials';
import { AsyncThunkConfig } from '../../@types/types';
import { verifyAndDecodeToken } from '../selectors/users';
import Cookies from 'js-cookie';
import { JWTPayload } from 'jose';
import { IFavorite, IFavoritePayload } from '../../@types/Favorites';
import apiClient from '../../api/apiClient';

const initialState: UserState = {
  isLogged: false,
  data: [],
  loading: false,
  error: null,
  credentials: {
    email: '',
    password: '',
  },
  pseudo: '',
  id: 0,
  favorite: [],
};

export const updatePseudo = createAction<string>('user/updatePseudo');
export const logout = createAction('user/logout');

//Recevoir les données
export const fetchUser = createAsyncThunk<User[], void, AsyncThunkConfig>(
  'user/fetchUser',
  async () => {
    const response = await apiClient.get<User[]>(`/user`);

    return response.data;
  }
);

//Connexion d'un utilisateur
export const login = createAsyncThunk<User, ICredentials, AsyncThunkConfig>(
  'user/login',
  async (credentials: ICredentials) => {
    const response = await apiClient.post(`/login`, credentials);

    await verifyAndDecodeToken(response.data.token)
      .then((payload) => {
        response.data.id = payload.userFound;
        Cookies.set('token', `${response.data.token}`, { expires: 365 });
      })
      .catch((err) => {
        console.error('Failed to decode token:', err);
      });
    console.log('ma reponse a login', response.data);
    return response.data;
  }
);

export type LoginThunk = typeof login;

interface DecodedToken extends JWTPayload {
  userFound: number;
}
//Reconnexion d'un utilisateur grace au token
export const reconnect = createAsyncThunk<
  DecodedToken,
  string,
  AsyncThunkConfig
>('user/reconnect', async (token: string) => {
  const response = await verifyAndDecodeToken(token);
  console.log('ma reponse a la reconnection ', response);
  return response as DecodedToken;
});

//Récupération des données d'un utilisateur
export const takeUser = createAsyncThunk<User, number, AsyncThunkConfig>(
  'user/takeUser',
  async (id: number) => {
    const response = await apiClient.get(`/user/${id}`);
    return response.data.data;
  }
);

//Modification d'un utilisateur
export const updateUser = createAsyncThunk<User, string, AsyncThunkConfig>(
  'user/updateUserAsync',
  async (userData: string) => {
    const response = await apiClient.put(`/login/`, userData);
    return response.data;
  }
);

//Modification de l'email d'un utilisateur
export const updateEmail = createAsyncThunk<User, string, AsyncThunkConfig>(
  'user/updateEmail',
  async (email: string) => {
    const response = await apiClient.put(`/login/email`, {
      email,
    });
    return response.data;
  }
);

//Modification du password d'un utilisateur
export const updatePassword = createAsyncThunk<User, User, AsyncThunkConfig>(
  'user/updatePassword',
  async (password: User) => {
    const response = await apiClient.put(`/login/password`, {
      password,
    });
    return response.data;
  }
);

//Suppression d'un utilisateur
export const deleteUser = createAsyncThunk<User, number, AsyncThunkConfig>(
  'user/deleteUser',
  async (idUser: number) => {
    const response = await apiClient.delete(`/user/${idUser}`);
    return response.data;
  }
);

//Recherche des favoris de l'utilisateur
export const fetchFavorite = createAsyncThunk<
  IFavorite[],
  number,
  AsyncThunkConfig
>('user/fetchFavorite', async (idUser: number) => {
  const response = await apiClient.get(`/places/favorite/${idUser}`);
  console.log(
    'ma reponse pour fetchfavorite dans le redux',
    response.data.data
  );
  return response.data.data;
});

//Ajout d'un lieu en favoris
export const addFavorite = createAsyncThunk<
  IFavorite,
  IFavoritePayload,
  AsyncThunkConfig
>('user/addFavorite', async (data: IFavoritePayload) => {
  console.log('data pour add favorite', data.idUser, data.idPlace);
  const response = await apiClient.post(`/places/favorite/${data.idUser}`, {
    place_id: data.idPlace,
  });
  console.log('ma reponse pour addFavorite dans le redux', response.data);
  return response.data.data;
});

//Suppression d'un lieu des favoris
export const deleteFavorite = createAsyncThunk<
  IFavorite,
  IFavoritePayload,
  AsyncThunkConfig
>('user/deleteFavorite', async (data: IFavoritePayload) => {
  console.log('data pour delete favorite', data.idUser, data.fav_id);
  const response = await apiClient.delete(
    `/places/favorite/${data.idUser}/${data.fav_id}`,
    {}
  );
  console.log('ma reponse pour addFavorite dans le redux', response.data);
  return response.data.data;
});

export const userReducer: Reducer<UserState> = createReducer<UserState>(
  initialState,
  (builder) => {
    builder
      .addCase(updatePseudo, (state, action) => {
        state.pseudo = action.payload;
      })
      .addCase(logout, (state) => {
        state.isLogged = false;
        state.id = 0;
        Cookies.remove('token');
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state: UserState, action) => {
        state.loading = false;
        state.isLogged = true;
        state.id = action.payload.id;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(reconnect.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        reconnect.fulfilled,
        (state: UserState, action: PayloadAction<DecodedToken>) => {
          state.loading = false;
          state.isLogged = true;
          state.id = action.payload.userFound;
        }
      )
      .addCase(reconnect.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(takeUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(takeUser.fulfilled, (state: UserState, action) => {
        state.pseudo = action.payload.username;
        state.credentials.password = action.payload.password;
        state.credentials.email = action.payload.email;

        state.loading = false;
      })
      .addCase(takeUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.pseudo = '';
        state.id = 0;
        state.isLogged = false;
        state.credentials.email = '';
        state.credentials.password = '';
        Cookies.remove('token');
      })
      .addCase(deleteUser.rejected, (state) => {
        state.loading = true;
      })
      .addCase(fetchFavorite.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFavorite.fulfilled, (state, action) => {
        console.log('ma reponse pour addcase dans le redux', action.payload);

        state.favorite = action.payload;
        state.loading = false;
      })
      .addCase(fetchFavorite.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(addFavorite.pending, (state) => {
        state.loading = true;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        console.log('ma reponse pour addcase dans le redux', action.payload);

        state.favorite.push(action.payload);
        state.loading = false;
      })
      .addCase(addFavorite.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(deleteFavorite.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteFavorite.fulfilled, (state, action) => {
        console.log('ma reponse pour addcase dans le redux', action.payload);

        state.favorite = state.favorite.filter(
          (fav) => fav.fav_id !== action.payload.fav_id
        );
        state.loading = false;
      })
      .addCase(deleteFavorite.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  }
);

export default userReducer;
