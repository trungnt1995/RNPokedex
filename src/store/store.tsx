import AsyncStorage from '@react-native-community/async-storage';
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {createLogger} from 'redux-logger';
import {persistStore, persistReducer} from 'redux-persist';
import rootReducer from '../reducers/index';
import mySaga from '../sagas';
// Middleware: Redux Persist Config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['favoriteReducer'],
};
const sagaMiddleware = createSagaMiddleware();
// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);
// Redux: Store
const store = createStore(
  persistedReducer,
  applyMiddleware(sagaMiddleware, createLogger()),
);
sagaMiddleware.run(mySaga);
// Middleware: Redux Persist Persister
let persistor = persistStore(store);
// Exports
export {store, persistor};
