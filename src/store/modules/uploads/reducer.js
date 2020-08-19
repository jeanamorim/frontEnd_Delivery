const initialState = {
  avatar: null,
};

function Upload(state = initialState, action) {
  switch (action.type) {
    case '@cycle/UPLOAD_AVATAR_SUCCESS':
      return { ...state, avatar: action.checkedFile };
    case '@cycle/CANCEL_AVATAR_UPLOADS':
      return { ...state, avatar: null };
    default:
      return state;
  }
}

export default Upload;
