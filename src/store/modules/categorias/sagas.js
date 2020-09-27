import { all, call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { getCategoriasSuccess, getCategoriaFailure } from './actions';

import api from '../../../services/api';

export function* getCategorias() {
  try {
    const { data } = yield call(api.get, 'categories');
    yield put(getCategoriasSuccess(data));
  } catch ({ response }) {
    yield put(getCategoriaFailure());
    toast.error(
      'Não foi possivel consultar suas categorias, verifique sua internet!',
    );
  }
}

export default all([
  takeLatest('@product/GET_CATEGORIA_REQUEST', getCategorias),
]);
