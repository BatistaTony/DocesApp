import { createStore } from 'redux'
import allReducers from './reducers'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
  key: "DocesApp",
  storage
}

const persistedReducer = persistReducer(persistConfig, allReducers)

const store = createStore(
  persistedReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);


const persistedStore  = persistStore(store)

export  {store, persistedStore}