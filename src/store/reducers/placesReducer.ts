import {
  Reducer,
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import { ICreatePlace, Places, PlacesState } from '../../@types/places';
import axios from 'axios';
import { AsyncThunkConfig } from '../../@types/types';

const url = import.meta.env.VITE_API_URL;

export const initialState: PlacesState = {
  list: [],
  loading: true,
  error: null,
  search: '',
};

export const loadPlaces = createAsyncThunk<Places[], void, AsyncThunkConfig>(
  'places/loadPlaces',
  async () => {
    const response = await axios.get<{ data: Places[] }>(`${url}places`);
    const list = Object.values(response.data)[0];
    return list;
  }
);

//Création d'un nouvelau lieu
export const createPlace = createAsyncThunk<
  ICreatePlace,
  ICreatePlace,
  AsyncThunkConfig
>('place/createPlace', async (placeData) => {
  const response = await axios.post<ICreatePlace>(`${url}places`, placeData);
  console.log(
    "renvoie apres l'enregistrement d'un nouveau lieu",
    response.data
  );
  return response.data;
});

// const fetchJoke = async () => {
//   try {
//   const response = await axios.get(
//   'https://api. chucknorris. io/jokes/random'

//   setJoke( response.data.value) ;
//   } catch (e) {
//   setJoke("An error occured, seems it's not time to laught ... ");

//   );

export const searchPlace = createAction<string>('places/searchPlace');

const placesReducer: Reducer<PlacesState> = createReducer<PlacesState>(
  initialState,
  (builder) => {
    builder
      .addCase(loadPlaces.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadPlaces.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(loadPlaces.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(searchPlace, (state, action) => {
        state.search = action.payload;
      })
      .addCase(createPlace.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPlace.rejected, (state, action) => {
        state.loading = true;
        state.error = action.error.message;
      })
      .addCase(createPlace.fulfilled, (state) => {
        state.loading = false;
      });
  }
);

export default placesReducer;
