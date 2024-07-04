import { AppDispatch, RootState } from './store'; // assurez-vous que le chemin est correct

export interface AsyncThunkConfig {
  state?: RootState;
  dispatch?: AppDispatch;
  extra?: unknown;
  rejectValue?: unknown;
}
