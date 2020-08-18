export const uploadAvatarRequest = file => {
  return {
    type: '@cycle/UPLOAD_AVATAR_REQUEST',
    file,
  };
};

export const uploadAvatarSuccess = checkedFile => {
  return {
    type: '@cycle/UPLOAD_AVATAR_SUCCESS',
    checkedFile,
  };
};
