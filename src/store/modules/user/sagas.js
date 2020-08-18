import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';

import { updateProfileSuccess, updateProfileFailure } from './actions';
import translate from '../../../locales';

export function* updateProfile({ payload }) {
  console.log(payload);
  try {
    const {
      name,
      name_loja,
      status,
      avaliacao,
      categoria,
      tempo_entrega,
      email,
      phone,
      birthday,
      gender,
      cpf,
      image_id,
      ...rest
    } = payload.data;

    const profile = {
      name,
      name_loja,
      status,
      avaliacao,
      categoria,
      tempo_entrega,
      email,
      phone,
      birthday,
      gender,
      cpf,
      image_id,
      ...(rest.oldPassword ? rest : {}),
    };

    const response = yield call(api.put, 'estabelecimento', profile);

    toast.success('Dados atualizado com sucesso');

    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    toast.error('Error ao atualizar o dados. Verifique');
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
