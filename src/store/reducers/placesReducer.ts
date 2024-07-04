import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import { Places } from '../../@types/places';
// import data from "../../data.json";
import axios from 'axios';
import data from '../../data.json';

interface PlacesState {
  list: Places[];
  loading: boolean;
  error: string | undefined | null;
}

export const initialState: PlacesState = {
  list: [],
  loading: true,
  error: null,
};

export const loadPlaces = createAsyncThunk('places/loadPlaces', async () => {
  const list = await axios.get<Places[]>('http://localhost:3001/places');

  return list.data;
});

// const fetchJoke = async () => {
//   try {
//   const response = await axios.get(
//   'https://api. chucknorris. io/jokes/random'

//   setJoke( response.data.value) ;
//   } catch (e) {
//   setJoke("An error occured, seems it's not time to laught ... ");

//   );

const placesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadPlaces.pending, (state) => {
      console.log('builder');
      state.loading = true;
    })
    .addCase(loadPlaces.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    })
    .addCase(loadPlaces.fulfilled, (state, action) => {
      console.log('le builder');
      console.log(action.payload);
      state.list = action.payload;
      state.loading = false;
    });
});

export default placesReducer;
