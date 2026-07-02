import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./userslice"

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'


console.log("storage =", storage);
console.log("storage.default =", storage.default);
console.log("typeof getItem =", typeof storage.getItem);
console.log("typeof default.getItem =", typeof storage.default?.getItem);

const persistConfig = {
  key: 'Ekart',
  version: 1,
  storage: storage.default,
}

const rootReducer = combineReducers({
    user: userSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})


export default store