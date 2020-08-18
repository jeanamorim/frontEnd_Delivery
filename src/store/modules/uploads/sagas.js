import { call, all, takeLatest, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { uploadAvatarSuccess } from './actions';

function* uploadImage({ file }) {
  if (file.url) {
    return yield put(uploadAvatarSuccess(file));
  }

  return toast.error('verifique sua internet e envie a imagem novamente');
}

export default all([takeLatest('@cycle/UPLOAD_AVATAR_REQUEST', uploadImage)]);
