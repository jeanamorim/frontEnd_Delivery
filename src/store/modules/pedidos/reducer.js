/* eslint-disable no-return-assign */
const initialState = {
  pendente: [],
  producao: [],
  enviado: [],
  entregue: [],
  cancelado: [],
};
function Pedidos(state = initialState, action) {
  switch (action.type) {
    case '@product/GET_PENDENTE':
      return (state = {
        ...state,
        pendente: action.data,
      });
    case '@product/GET_PRODUCAO':
      return (state = {
        ...state,
        producao: action.data,
      });
    case '@product/GET_ENVIADO':
      return (state = {
        ...state,
        enviado: action.data,
      });
    case '@product/GET_ENTREGUE':
      return (state = {
        ...state,
        entregue: action.data,
      });
    case '@product/GET_CANCELADO':
      return (state = {
        ...state,
        cancelado: action.data,
      });

    default:
      return state;
  }
}

export default Pedidos;