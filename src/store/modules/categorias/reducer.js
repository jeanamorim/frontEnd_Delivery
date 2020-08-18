/* eslint-disable no-return-assign */
const initialState = {
  Categorias: [],
};
function Categorias(state = initialState, action) {
  switch (action.type) {
    case '@product/GET_CATEGORIA_SUCCESS':
      return (state = {
        ...state,
        Categorias: action.product,
      });

    default:
      return state;
  }
}

export default Categorias;
