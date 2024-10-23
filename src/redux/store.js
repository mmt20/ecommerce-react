import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
//import { composeWithDevTools } from '@redux-devtools/extension';

const initailState = {};
const middleware = [thunk];

const store = createStore(
  rootReducer,
  initailState,
  applyMiddleware(...middleware)
  // composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
