import { AppDispatch, RootState } from './store'; 

export interface AsyncThunkConfig {
  state?: RootState;
  dispatch?: AppDispatch;
  extra?: unknown;
  rejectValue?: unknown;
}
