import { all, call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import {
  getCategoriasSuccess,
  getCategoriaFailure,
  postCategoriaSucess,
  postCategoriaFailure,
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
// export function* deleteOfertas({ payload }) {
//   const { id } = payload;
//   try {
//     yield call(api.delete, `offers/${id}`);
//     toast.success('Oferta encerrada com sucesso!');
//     yield put(deletOfertasSucess());
//   } catch ({ response }) {
//     yield put(deletOfertasFailure());
//     toast.error(
//       'Não foi possivel consultar suas ofertas, verifique sua internet!',
//     );
//   }
// }

export default all([
  takeLatest('@product/GET_CATEGORIA_REQUEST', getCategorias),
  takeLatest('@product/POST_CATEGORIA_REQUEST', cadastrarCategoria),
  // takeLatest('@product/DELETE_OFERTA_REQUEST', deleteOfertas),
]);
