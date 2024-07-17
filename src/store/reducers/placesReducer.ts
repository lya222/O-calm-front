import {
  Reducer,
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import { ICreatePlace, Places, PlacesState } from '../../@types/places';
import axios from 'axios';
import { AsyncThunkConfig } from '../../@types/types';
import apiClient from '../../api/apiClient';

const urlPicture = import.meta.env.VITE_API_URL_PICTURE;

export const initialState: PlacesState = {
  list: [],
  loading: false,
  error: null,
  search: '',
  picture: {
    url: '',
    name: '',
    extension: '',
    isloading: false,
    isDownload: false,
  },
};

export const loadPlaces = createAsyncThunk<Places[], void, AsyncThunkConfig>(
  'places/loadPlaces',
  async () => {
    const response = await apiClient.get<{ data: Places[] }>(`/places`);
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
  const response = await apiClient.post<ICreatePlace>(`/places`, placeData);
  console.log(
    "renvoie apres l'enregistrement d'un nouveau lieu",
    response.data
  );
  return response.data;
});

interface UploadResponse {
  secure_url: string;
  original_filename: string;
  original_extension: string;
}

export const uploadPicture = createAsyncThunk<
  UploadResponse,
  FormData,
  AsyncThunkConfig
>('place/uploadImage', async (formdata) => {
  const response = await axios.post(urlPicture, formdata);
  return response.data;
});

//Pour supprimer une route
export const deletePlace = createAsyncThunk<string, number, AsyncThunkConfig>(
  'place/deletePlace',
  async (idUser: number) => {
    console.log('je suis dans le reducer de deletePlace');
    const response = await apiClient.delete(`/places/${idUser}`);
    console.log('reponse du deletePlace', response.data);
    return response.data;
  }
);

export const searchPlace = createAction<string>('places/searchPlace');

// Request for generate a route

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
      })
      .addCase(uploadPicture.fulfilled, (state, action) => {
        state.picture.isDownload = true;
        state.picture.isloading = false;
        state.picture.url = action.payload.secure_url;
        state.picture.name = action.payload.original_filename;
        state.picture.extension = action.payload.original_extension;
      })
      .addCase(uploadPicture.pending, (state) => {
        state.picture.isDownload = false;
        state.picture.isloading = true;
        state.picture.name = "Téléchargement de l'image";
      })
      .addCase(uploadPicture.rejected, (state) => {
        state.picture.isloading = false;
      })
      .addCase(deletePlace.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deletePlace.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePlace.rejected, (state) => {
        state.loading = false;
      });
  }
);

export default placesReducer;
