import { all, call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import {
  getCategoriasSuccess,
  getCategoriaFailure,
  postCategoriaSucess,
  postCategoriaFailure,
  editCategoriaSucess,
  editCategoriaFailure,
} from './actions';

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
export function* cadastrarCategoria({ payload }) {
  const { categoria } = payload;
  try {
    yield call(api.post, 'categories', categoria);
    const { data } = yield call(api.get, 'categories');
    yield put(getCategoriasSuccess(data));
    yield put(postCategoriaSucess());
    toast.success('Categoria adicionada com sucesso!');
  } catch ({ response }) {
    yield put(postCategoriaFailure());
    toast.error(
      'Não foi possivel cadastrar essa categoria, verifique sua internet!',
    );
  }
}
export function* editCategoria({ payload }) {
  const { id, name } = payload.categoria;
  const image_id = payload.categoria.avatar.id;

  try {
    yield call(api.put, `categories/${id}`, {
      name,
      image_id,
    });
    const { data } = yield call(api.get, 'categories');
    yield put(getCategoriasSuccess(data));
    toast.success('Categoria editada com sucesso!');
    yield put(editCategoriaSucess());
  } catch ({ response }) {
    yield put(editCategoriaFailure());
    toast.error(
      'Não foi possivel atualizar a categoria, verifique sua internet!',
    );
  }
}

export default all([
  takeLatest('@product/GET_CATEGORIA_REQUEST', getCategorias),
  takeLatest('@product/POST_CATEGORIA_REQUEST', cadastrarCategoria),
  takeLatest('@product/EDIT_CATEGORIA_REQUEST', editCategoria),
]);
