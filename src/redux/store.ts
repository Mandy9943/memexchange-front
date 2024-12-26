import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import dappReducer from './dapp/dapp-slice';
export function makeStore() {
  return configureStore({
    reducer: {
      dapp: dappReducer
    }
  });
}
const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
