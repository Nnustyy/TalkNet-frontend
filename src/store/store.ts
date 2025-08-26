import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import {api} from '../app/services/api'
import user from '../features/user/userSlice'
import { listenerMiddleware } from "@/middleware/auth";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user,
  },
  middleware:(getDefaultMiddleware) => {
    return getDefaultMiddleware()
    .concat(api.middleware)
    .prepend(listenerMiddleware.middleware)
  }
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ThunkReturnType = void> = ThunkAction<
ThunkReturnType,
RootState,
unknown,
Action
>
