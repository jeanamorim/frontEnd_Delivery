import { all, call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import {
  GetOfertaSucess,
  GetOfertasFailure,
  deletOfertasSucess,
  deletOfertasFailure,
  postOfertasSucess,
  postOfertaFailure,
} from './actions';

import api from '../../../services/api';

export function* getOfertas() {
  try {
    const { data } = yield call(api.get, 'offers');
    yield put(GetOfertaSucess(data));
  } catch ({ response }) {
    yield put(GetOfertasFailure());
    toast.error(
      'Não foi possivel consultar as ofertas, verifique sua internet!',
    );
  }
}
export function* CadastrarOfertas({ payload }) {
  const { offer } = payload;
  try {
    yield call(api.post, 'offers', offer);
    const { data } = yield call(api.get, 'offers');
    yield put(GetOfertaSucess(data));
    toast.success('Oferta cadastrado  com sucesso!');
    yield put(postOfertasSucess());
  } catch ({ response }) {
    yield put(postOfertaFailure());
    toast.error(
      'Não foi possivel cadastrar essa oferta, verifique sua internet!',
    );
  }
}

export function* deleteOfertas({ payload }) {
  const { id } = payload;

  try {
    yield call(api.delete, `offers/${id}`);
    const { data } = yield call(api.get, 'offers');
    yield put(GetOfertaSucess(data));
    yield put(deletOfertasSucess());
    toast.success('Oferta encerrada com sucesso!');
  } catch ({ response }) {
    yield put(deletOfertasFailure());
    toast.error('Falha ao deletar, verifique sua internet!');
  }
}

export default all([
  takeLatest('@product/GET_OFERTA_REQUEST', getOfertas),
  takeLatest('@product/POST_OFERTA_REQUEST', CadastrarOfertas),
  takeLatest('@product/DELETE_OFERTA_REQUEST', deleteOfertas),
]);
