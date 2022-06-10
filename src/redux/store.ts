import { IAuthInitialState } from './types/typesStore';
import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth/auth-slice";
import { error } from "./error/error-reducer";
import projects from "./projects/projects-slice";
import sprints from "./sprints/sprints-slice";
import tasks from "./task/task-slice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "refreshToken", "sid", "isLoggedIn", "user"],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer<IAuthInitialState>(authPersistConfig, authReducer),
    error,
    projects,
    sprints,
    tasks,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(thunk),
  devTools: process.env.NODE_ENV === "development",
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
