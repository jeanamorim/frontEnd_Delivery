// modal variacao
export function openModalCadastarVariacao() {
  return {
    type: '@product/OPEN_MODAL_CADASTRAR_VARIACAO',
  };
}
export function closeModalCadastarVariacao() {
  return {
    type: '@product/CLOSE_MODAL_CADASTRAR_VARIACAO',
  };
}
// cadastrar uma variacao
export function postVariacaoRequest(data) {
  return {
    type: '@product/CADASTRAR_VARIACAO_REQUEST',
    payload: { data },
  };
}
export function postVariacaoSucess() {
  return {
    type: '@product/CADASTRAR_VARIACAO_SUCESS',
  };
}
export function postVariacaoFailure() {
  return {
    type: '@product/CADASTRAR_VARIACAO_FAILURE',
  };
}

