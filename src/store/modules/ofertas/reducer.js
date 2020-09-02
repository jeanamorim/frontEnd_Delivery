/* eslint-disable no-return-assign */
const initialState = {
  Ofertas: [],
  loading: false,
};
function Ofertas(state = initialState, action) {
  switch (action.type) {
    case '@product/GET_OFERTA_SUCCESS':
      return (state = {
        ...state,
        Ofertas: action.product,
        loading: false,
      });
    case '@product/GET_OFERTA_REQUEST':
      return (state = {
        ...state,
        loading: true,
      });
    case '@product/GET_OFERTAS_FAILURE':
      return (state = {
        ...state,
        loading: false,
      });

    default:
      return state;
  }
}

export default Ofertas;
