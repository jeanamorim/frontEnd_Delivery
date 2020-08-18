const initialState = {
  avatar: null,
};

function Upload(state = initialState, action) {
  switch (action.type) {
    case '@cycle/UPLOAD_AVATAR_SUCCESS':
      return { ...state, avatar: action.checkedFile };

    default:
      return state;
  }
}

export default Upload;
