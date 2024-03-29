import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import user from './user/sagas';
import uploads from './uploads/sagas';
import product from './product/sagas';

import categorias from './categorias/sagas';

export default function* rootSaga() {
  return yield all([auth, user, uploads, product, categorias]);
}
