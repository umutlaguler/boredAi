import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // Veya Redux'ta kullanılan middleware
import rootReducer from './src/reducers/rootReducer';

const middleware = [thunk]; // Gerekirse middleware'leri burada ekleyin

const store = createStore(
  rootReducer,
  applyMiddleware(...middleware)
);

export default store;