import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./userslice"
import productReducer from "./productSlice";
import { persistStore } from 'redux-persist'


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
  whitelist: ["user"],
}

const rootReducer = combineReducers({
    user: userSlice,
    product: productReducer,
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

export const persistor = persistStore(store);
export default store