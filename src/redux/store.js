import {configureStore , combineReducers} from "@reduxjs/toolkit";
import contactReducer from "./contacts/slice"
import filterReducer from "./filters/slice";
import authReducer from "./auth/slice"
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

const rootReducer = combineReducers({
    contacts: contactReducer,
    filters: filterReducer,
    auth:persistReducer(authPersistConfig, authReducer),
  });


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),

});
export const persistor = persistStore(store);