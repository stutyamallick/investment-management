import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import combineReducer from './appReducer';

const store = createStore(combineReducer, applyMiddleware(thunk));

export default store;