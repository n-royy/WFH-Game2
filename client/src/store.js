import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducer';

const innitialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  innitialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
