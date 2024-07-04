import { Reducer } from '@reduxjs/toolkit';
import { PlacesState } from '../../@types/places';
import { UserState } from '../../@types/user';
import placesReducer from './placesReducer';
import userReducer from './userReducer';

export interface RootState {
  places: PlacesState;
  user: UserState;
}

const rootReducer: {
  places: Reducer<PlacesState>;
  user: Reducer<UserState>;
} = {
  places: placesReducer,
  user: userReducer,
};

export default rootReducer;
