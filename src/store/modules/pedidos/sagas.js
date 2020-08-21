import { all, call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { parseISO, formatDistanceStrict } from 'date-fns';
import pt from 'date-fns/locale/pt';
import {
  getPendente,
  getProducao,
  getEnviado,
  getEntregue,
  getCancelado,
} from './actions';

import api from '../../../services/api';

export function* getPedidos() {
  const date = new Date();
  try {
    const pendente = yield call(api.get, `status/PENDENTE`, {
      params: { date },
    });

    const producao = yield call(api.get, `status/PRODUCAO`, {
      params: { date },
    });
    const enviado = yield call(api.get, `status/ENVIADO`, {
      params: { date },
    });
    const entregue = yield call(api.get, `status/ENTREGUE`, {
      params: { date },
    });
    const cancelado = yield call(api.get, `status/CANCELADO`, {
      params: { date },
    });
    const pendentes = pendente.data.map(status => ({
      ...status,
      timeDistance: formatDistanceStrict(parseISO(status.date), new Date(), {
        addSuffix: true,
        locale: pt,
      }),
    }));
    const producoes = producao.data.map(status => ({
      ...status,
      timeDistance: formatDistanceStrict(parseISO(status.date), new Date(), {
        addSuffix: true,
        locale: pt,
      }),
    }));
    const enviados = enviado.data.map(status => ({
      ...status,
      timeDistance: formatDistanceStrict(parseISO(status.date), new Date(), {
        addSuffix: true,
        locale: pt,
      }),
    }));
    const entregues = entregue.data.map(status => ({
      ...status,
      timeDistance: formatDistanceStrict(parseISO(status.date), new Date(), {
        addSuffix: true,
        locale: pt,
      }),
    }));
    const cancelados = cancelado.data.map(status => ({
      ...status,
      timeDistance: formatDistanceStrict(parseISO(status.date), new Date(), {
        addSuffix: true,
        locale: pt,
      }),
    }));

    yield put(getPendente(pendentes));
    yield put(getProducao(producoes));
    yield put(getEnviado(enviados));
    yield put(getEntregue(entregues));
    yield put(getCancelado(cancelados));
  } catch ({ response }) {
    toast.error(
      'Não foi possivel consultar os pedidos, verifique sua internet!',
    );
  }
}
export function* updateStatus({ payload }) {
  const { status, orderId } = payload;
  try {
    yield call(api.put, `orders/${orderId}`, {
      status,
    });
    toast.error('Sucesssooooo');
    // yield put(getCategoriasSuccess(data));
  } catch ({ response }) {
    // yield put(getCategoriaFailure());
    toast.error(
      'Não foi possivel consultar suas categorias, verifique sua internet!',
    );
  }
}

export default all([
  takeLatest('@product/GET_PEDIDOS_REQUEST', getPedidos),
  takeLatest('@product/UPDATE_STATUS', updateStatus),
  // takeLatest('@product/EDIT_CATEGORIA_REQUEST', editCategoria),
]);
