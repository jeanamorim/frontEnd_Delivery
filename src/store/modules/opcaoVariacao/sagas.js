import { all, call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { postVariacaoSucess, postVariacaoFailure } from './actions';

import api from '../../../services/api';

export function* cadastrarVariacao({ payload }) {
  const { data } = payload;
  try {
    yield call(api.post, 'variacao', data);

    toast.success('Variação cadastrada com sucesso!');
    yield put(postVariacaoSucess());
  } catch ({ response }) {
    yield put(postVariacaoFailure());
    toast.error(
      'Não foi possivel cadastrar essa variacao, verifique sua internet!',
    );
  }
}
export function* deletarOpcao({ payload }) {
  const { id } = payload;
  try {
    yield call(api.delete, `opcaovariacao/${id}`);

    toast.success('Opção deletada com sucesso!');
    yield put(postVariacaoSucess());
  } catch ({ response }) {
    yield put(postVariacaoFailure());
    toast.error('Não foi possivel deletar essa opção, verifique sua internet!');
  }
}

export default all([
  takeLatest('@product/CADASTRAR_VARIACAO_REQUEST', cadastrarVariacao),
  takeLatest('@product/DELETAR_OPCAO_REQUEST', deletarOpcao),
]);