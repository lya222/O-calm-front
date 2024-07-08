import {
  PayloadAction,
  Reducer,
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import { CreateUser, User, UserState } from '../../@types/user';
import { ICredentials } from '../../@types/Icredentials';
import axios from 'axios';
import { AsyncThunkConfig } from '../../@types/types';

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
};

export const updatePseudo = createAction<string>('user/updatePseudo');
export const logout = createAction('user/logout');

//Recevoir les données
export const fetchUser = createAsyncThunk<User[], void, AsyncThunkConfig>(
  'user/fetchUser',
  async () => {
    // console.log('asyncthunk fetchUser marche');
    const response = await axios.get<User[]>(`${url}user`);

    return response.data;
  }
);

//Création d'un nouvel utilisaeur
export const createUser = createAsyncThunk<
  CreateUser,
  CreateUser,
  AsyncThunkConfig
>('user/createUserAsync', async (userData) => {
  const response = await axios.post<CreateUser>(`${url}register`, userData);
  console.log("renvoie apres l'enregistrement", response.data);
  return response.data;
});

//Connexion d'un utilisateur
export const login = createAsyncThunk<User, ICredentials, AsyncThunkConfig>(
  'user/login',
  async (credentials: ICredentials) => {
    const response = await axios.post(`${url}login`, credentials);

    return response.data;
  }
);

export type LoginThunk = typeof login;

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

export const userReducer: Reducer<UserState> = createReducer<UserState>(
  initialState,
  (builder) => {
    builder
      .addCase(updatePseudo, (state, action) => {
        state.pseudo = action.payload;
      })
      .addCase(logout, (state) => {
        state.isLogged = false;
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
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        const newUser: ICredentials = {
          email: action.payload.email,
          password: action.payload.password,
        };
        state.pseudo = action.payload.username;
        state.credentials = newUser;
        state.loading = false;
        state.isLogged = true;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        login.fulfilled,
        (state: UserState, action: PayloadAction<User>) => {
          state.loading = false;
          state.isLogged = true;
          state.pseudo = action.payload.username;
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
    // .addCase(updateEmail.pending, (state) => {
    //   state.loading = true;
    // })
    // .addCase(updateEmail.fulfilled, (state, action) => {
    //   state.data[0].email = action.payload;
    //   state.loading = false;
    // })
    // .addCase(updateEmail.rejected, (state, action) => {
    //   state.error = action.error.message;
    //   state.loading = false;
    // })
    // .addCase(updatePassword.pending, (state) => {
    //   state.loading = true;
    // })
    // .addCase(updatePassword.fulfilled, (state, action) => {
    //   state.data[0].password = action.payload;
    //   state.loading = false;
    // })
    // .addCase(updatePassword.rejected, (state, action) => {
    //   state.error = action.error.message;
    //   state.loading = false;
    // });
  }
);

export default userReducer;
