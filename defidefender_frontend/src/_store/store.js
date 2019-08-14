import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
// import rootReducer from '../_reducers';
import { BlacklistReducer } from '../_reducers'

const loggerMiddleware = createLogger();

export const store = createStore(
    BlacklistReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);