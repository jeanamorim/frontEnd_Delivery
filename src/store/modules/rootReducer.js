import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import uploads from './uploads/reducer';

import product from './product/reducer';
import categorias from './categorias/reducer';

export default combineReducers({
  auth,
  user,
  uploads,

  product,
  categorias,
});
