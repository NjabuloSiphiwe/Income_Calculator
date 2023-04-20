import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { expenseSlice } from "./expense/expense-slice";

import storage from "redux-persist/lib/storage";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
import { loggerMiddleware } from "./expense/middlewares/logger-middleware";
// [x] 1 Combine the reducers ( slices content ) into a single reducer
const rootReducer = combineReducers({
    EXPENSE: expenseSlice.reducer,
})
// [x] 2 Create  a basic configuration to tell redux to use the local storage
const persistConfig = {
    key: "root",
    version: 1,
    storage,
    blacklist:['EXPENSE'],
   // whitelist:['']
}
// [x] 3 Persist the reducers 
const persistedReducers = persistReducer(persistConfig, rootReducer);
// [x] 4 Send the persisted reducers to the store 
const store = configureStore({reducer: persistedReducers, 
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).prepend(loggerMiddleware.middleware),});

// [x] 5 Create a persisted version of the store
const persistor =persistStore(store);
// [x] 6 Export the persisted version of the store 

// [] 7 Use the persistedGate component to give your app access to the persisted store

// [] 8 Tell Redux to ignore all rthe actions sent by the redux-persist

export {store,persistor};