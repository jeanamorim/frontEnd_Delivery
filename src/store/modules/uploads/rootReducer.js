import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import misc from './misc/reducer';
import file from './Files/reducer';
import product from './product/reducer';
import ofertas from './ofertas/reducer';
import uploads from './uploads/reducer';

export default combineReducers({
  auth,
  user,
  misc,
  file,
  product,
  ofertas,
  uploads,
});
