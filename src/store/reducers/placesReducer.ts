import { Reducer, createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import { Places, PlacesState } from '../../@types/places';
// import data from "../../data.json";
import axios from 'axios';
// import 'dotenv/config';
import { AsyncThunkConfig } from '../../@types/types';

const url = import.meta.env.VITE_API_URL;
console.log('MON URL ', import.meta.env.VITE_API_URL);

export const initialState: PlacesState = {
  list: [],
  loading: true,
  error: null,
};

export const loadPlaces = createAsyncThunk<Places[], void, AsyncThunkConfig>(
  'places/loadPlaces',
  async () => {
    const list = await axios.get<Places[]>(`${url}places`);

    return list.data;
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
      });
  }
);

export default placesReducer;
