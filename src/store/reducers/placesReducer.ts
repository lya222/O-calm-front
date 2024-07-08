import {
  Reducer,
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import { Places, PlacesState } from '../../@types/places';
import axios from 'axios';
import { AsyncThunkConfig } from '../../@types/types';

const url = 'http://165.22.25.11:4000/';

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
      });
  }
);

export default placesReducer;
