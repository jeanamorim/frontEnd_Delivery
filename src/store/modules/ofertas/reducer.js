/* eslint-disable no-return-assign */
const initialState = {
  Ofertas: [],
};
function Ofertas(state = initialState, action) {
  switch (action.type) {
    case '@product/GET_OFERTA_SUCCESS':
      return (state = {
        ...state,
        Ofertas: action.product,
      });

    default:
      return state;
  }
}

export default Ofertas;
