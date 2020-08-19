import { all, call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import {
  deleteProductFailure,
  deleteProductSucess,
  GetProductFailure,
  GetProductSucess,
  fecharModalCadastarProduct,
  postProductFailure,
  listProductSucess,
  listProductFailure,
  closeEditProduct,
} from './actions';

import api from '../../../services/api';

export function* getProduct({ payload }) {
  const { id } = payload;

  try {
    const { data } = yield call(api.get, `products/${id}`);
    yield put(GetProductSucess(data));
  } catch ({ response }) {
    yield put(GetProductFailure());
    toast.error(
      'Não foi possivel consultar os produtos, verifique sua internet!',
    );
  }
}
export function* listProduct() {
  try {
    const { data } = yield call(api.get, 'productsList');
    yield put(listProductSucess(data));
  } catch ({ response }) {
    yield put(listProductFailure());
  }
}
export function* cadastrarProducts({ payload }) {
  const { product } = payload;
  const id = payload.avatar.avatar;
  if (id === null) {
    toast.error('A imagem é obrigatória, favor verificar!');
    return;
  }
  try {
    yield call(api.post, 'products', {
      ...product,
      image_id: id.id,
    });
    toast.success('Produto cadastrado  com sucesso!');
    yield put(fecharModalCadastarProduct());
  } catch ({ response }) {
    yield put(postProductFailure());
    toast.error(
      'Não foi possivel cadastrar essa produto, verifique sua internet!',
    );
  }
}

export function* editProduct({ payload }) {
  const { id } = payload;
  const { data } = payload;
  const image = payload.avatar.id;
  const { idCat } = payload;

  try {
    yield call(api.put, `products/${id}`, {
      ...data,
      image_id: image,
    });
    const response = yield call(api.get, `products/${idCat}`);
    yield put(GetProductSucess(response.data));
    yield put(closeEditProduct());
    toast.success('Produto atualizado com sucesso!');
  } catch ({ response }) {
    toast.error('Falha ao atualizar, verifique sua internet!');
  }
}
export function* deleteProducts({ payload }) {
  const { id } = payload;
  const { idCat } = payload;
  try {
    yield call(api.delete, `products/${id}`);
    const response = yield call(api.get, `products/${idCat}`);
    yield put(GetProductSucess(response.data));
    yield put(deleteProductSucess());
    toast.success('Produto deletado com sucesso!');
  } catch ({ response }) {
    yield put(deleteProductFailure());
    toast.error('Falha ao deletar, verifique sua internet!');
  }
}
export default all([
  takeLatest('@product/GET_PRODUCT_REQUEST', getProduct),
  takeLatest('@product/LIST_PRODUCT_REQUEST', listProduct),
  takeLatest('@product/POST_PRODUCT_REQUEST', cadastrarProducts),
  takeLatest('@product/DELETE_PRODUCT_REQUEST', deleteProducts),
  takeLatest('@product/EDIT_REQUEST', editProduct),
]);
