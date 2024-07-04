import placesReducer from './placesReducer';
import userReducer from './userReducer';

const rootReducer = {
  places: placesReducer,
  user: userReducer,
};

export default rootReducer;
