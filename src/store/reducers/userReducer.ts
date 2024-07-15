import {
  PayloadAction,
  Reducer,
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import { User, UserState } from '../../@types/user';
import { ICredentials } from '../../@types/Icredentials';
import axios from 'axios';
import { AsyncThunkConfig } from '../../@types/types';
import { verifyAndDecodeToken } from '../selectors/users';
import Cookies from 'js-cookie';
import { JWTPayload } from 'jose';

const url = import.meta.env.VITE_API_URL;

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
  favorite: [0],
};

export const updatePseudo = createAction<string>('user/updatePseudo');
export const logout = createAction('user/logout');

//Recevoir les données
export const fetchUser = createAsyncThunk<User[], void, AsyncThunkConfig>(
  'user/fetchUser',
  async () => {
    const response = await axios.get<User[]>(`${url}user`);

    return response.data;
  }
);

// //Création d'un nouvel utilisaeur
// export const createUser = createAsyncThunk<
//   IResponseCreateUser,
//   CreateUser,
//   AsyncThunkConfig
// >('user/createUserAsync', async (userData) => {
//   console.log("mes donnes que je rentre pour l'enregistrement", userData);
//   const response = await axios.post<IResponseCreateUser>(
//     `${url}register`,
//     userData
//   );
//   return response.data;
// });

//Connexion d'un utilisateur
export const login = createAsyncThunk<User, ICredentials, AsyncThunkConfig>(
  'user/login',
  async (credentials: ICredentials) => {
    const response = await axios.post(`${url}login`, credentials);

    await verifyAndDecodeToken(response.data.token)
      .then((payload) => {
        response.data.id = payload.userFound;
        Cookies.set('token', `${response.data.token}`, { expires: 365 });
      })
      .catch((error) => {
        console.error('Failed to decode token:', error);
      });

    return response.data;
  }
);

export type LoginThunk = typeof login;

interface DecodedToken extends JWTPayload {
  userFound: number;
}

export const reconnect = createAsyncThunk<
  DecodedToken,
  string,
  AsyncThunkConfig
>('user/reconnect', async (token: string) => {
  const response = await verifyAndDecodeToken(token);
  console.log('ma reponse a la reconnection ', response.userFound);
  return response as DecodedToken;
});
export const takeUser = createAsyncThunk<User, number, AsyncThunkConfig>(
  'user/takeUser',
  async (id: number) => {
    const response = await axios.get(`${url}user/${id}`);
    return response.data.data;
  }
);

//Modification d'un utilisateur
export const updateUser = createAsyncThunk<User, string, AsyncThunkConfig>(
  'user/updateUserAsync',
  async (userData: string) => {
    const response = await axios.put(`${url}login/`, userData);
    return response.data;
  }
);

//Modification du mail utilisateur
export const updateEmail = createAsyncThunk<User, string, AsyncThunkConfig>(
  'user/updateEmail',
  async (email: string) => {
    const response = await axios.put(`${url}login/email`, {
      email,
    });
    return response.data;
  }
);

//Modification du password utilisateur
export const updatePassword = createAsyncThunk<User, User, AsyncThunkConfig>(
  'user/updatePassword',
  async (password: User) => {
    const response = await axios.put(`${url}login/password`, {
      password,
    });
    return response.data;
  }
);

//Suprime un utilisateur
export const deleteUser = createAsyncThunk<User, number, AsyncThunkConfig>(
  'user/deleteUser',
  async (idUser: number) => {
    const response = await axios.delete(`${url}user/${idUser}`);
    return response.data;
  }
);

//Recherche tous les favoris de l'user
export const fetchFavorite = createAsyncThunk<
  number[],
  number,
  AsyncThunkConfig
>('user/fetchFavorite', async (idUser: number) => {
  const response = await axios.get(`${url}/places/favorite/${idUser}`);
  console.log('ma reponse pour fetchfavorite dans le redux', response.data);
  return response.data.data;
});

//Ajout d'un leu en favoris
export const addFavorite = createAsyncThunk<
  number,
  AddFavoritePayload,
  AsyncThunkConfig
>('user/fetchFavorite', async (data: AddFavoritePayload) => {
  const response = await axios.post(
    `${url}/places/favorite/${data.idUser}/${data.idPlace}`
  );
  console.log('ma reponse pour addFavorite dans le redux', response.data);
  return response.data;
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
      // .addCase(updateUser.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(updateUser.fulfilled, (state, action) => {
      //   state.data = action.payload;
      //   state.loading = false;
      // })
      // .addCase(updateUser.rejected, (state, action) => {
      //   state.error = action.error.message;
      //   state.loading = false;
      // })
      // .addCase(createUser.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(createUser.fulfilled, (state) => {
      //   // const newUser: ICredentials = {
      //   //   email: action.payload.email,
      //   //   password: action.payload.password,
      //   // };
      //   // state.pseudo = action.payload.username;
      //   // state.credentials = newUser;
      //   state.loading = false;
      // })
      // .addCase(createUser.rejected, (state, action) => {
      //   state.error = action.error.message;
      //   state.loading = false;
      // })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        login.fulfilled,
        (state: UserState, action: PayloadAction<User>) => {
          state.loading = false;
          state.isLogged = true;
          state.id = action.payload.id;
        }
      )
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
      });
  }
);

export default userReducer;
