import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import pokemonReducer from './slices/pokemonSlice';
import rootSaga from './sagas/rootSaga';


const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
