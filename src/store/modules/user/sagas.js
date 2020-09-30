import { takeLatest, call, put, all } from 'redux-saga/effects';

import { toast } from 'react-toastify';

import api from '../../../services/api';

import { updateProfileSuccess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
  try {
    const {
      status,
      image_id,
      email,

      ...rest
    } = payload.data;

    const profile = {
      status,
      image_id,
      email,

      ...(rest.oldPassword ? rest : {}),
    };

    const response = yield call(api.put, 'estabelecimento', profile);
    console.log(response.data);
    toast.success('Dados atualizado com sucesso');

    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    toast.error('Error ao atualizar o dados. Verifique');
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
