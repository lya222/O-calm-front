import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { Places } from "../../@types/places";
// import data from "../../data.json";
import axios from "axios";

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

export const loadPlaces = createAsyncThunk("places/loadPlaces", async () => {
  const list = await axios.get("http://localhost:3001/places");
  // console.log(list);
  return list;
});

const placesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadPlaces.pending, (state) => {
      state.loading = true;
    })
    .addCase(loadPlaces.rejected, (state) => {
      state.loading = true;
    })
    .addCase(loadPlaces.fulfilled, (state, action) => {
      console.log("le builder");
      console.log(action.payload);
      state.list = action.payload;
    });
});

export default placesReducer;
