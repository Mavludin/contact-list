import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleWare from 'redux-saga';
import { rootSaga } from '../saga/sagas';
import { reducer } from "./reducer";

const sagaMiddleware = createSagaMiddleWare();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const mainStore = createStore(
  reducer,
  /* preloadedState, */  composeEnhancers(applyMiddleware(sagaMiddleware))
)

export const runSagaMiddleware = () => sagaMiddleware.run(rootSaga)