import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import { User } from '../../@types/user';
import axios from 'axios';

export interface UserState {
  loading: boolean;
  error: string | null | undefined;
  data: User[] | null;
}

interface UserData {
  pseudo: string;
  email: string;
  password: string;
}

const initialState: UserState = {
  loading: false,
  error: null,
  data: [],
};

const apiUrl = 'http://localhost:3001/';

export const fetchUser = createAsyncThunk<User[]>(
  'user/fetchUser',
  async () => {
    const response = await axios.get(`${apiUrl}login`);
    console.log('fetch data', response.data);
    return response.data;
  }
);

export const fetchOneUser = createAsyncThunk<User[]>(
  'user/fetchOneUser',
  async (userId) => {
    const response = await axios.get(`${apiUrl}${userId}`);
    return response.data;
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ userId, userData }) => {
    const response = await axios.put(`${apiUrl}/${userId}`, userData);
    return response.data;
  }
);

export const createUser = createAsyncThunk(
  'user/createUser',
  async (userData: UserData) => {
    console.log('register', userData);
    const response = await axios.post(`${apiUrl}register`, userData);
    return response.data;
  }
);

export const findUser = createAsyncThunk(
  'user/findUser',
  async (searchPseudo: string) => {
    const { data } = await axios.get(`${apiUrl}login`);
    console.log('finduser ', data);
    const result = data.includes((user: User) => user.pseudo === searchPseudo);
    console.log('resultat, ', result);
    return result;
  }
);

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    })
    .addCase(fetchUser.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    })
    .addCase(fetchOneUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchOneUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    })
    .addCase(fetchOneUser.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    })
    .addCase(updateUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    })
    .addCase(updateUser.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    })
    .addCase(createUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(createUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    })
    .addCase(createUser.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
});

export default userReducer;
