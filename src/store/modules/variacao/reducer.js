/* eslint-disable no-return-assign */
const initialState = {
  openModal: false,
};
function Variacao(state = initialState, action) {
  switch (action.type) {
    case '@product/OPEN_MODAL_CADASTRAR_VARIACAO':
      return (state = {
        ...state,
        openModal: true,
      });
    case '@product/CLOSE_MODAL_CADASTRAR_VARIACAO':
      return (state = {
        ...state,
        openModal: false,
      });

    default:
      return state;
  }
}

export default Variacao;
