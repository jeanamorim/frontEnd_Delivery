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
// deletar opcao

export function deleteOpcaoRequest(id) {
  return {
    type: '@product/DELETAR_OPCAO_REQUEST',
    payload: { id },
  };
}
export function deleteOpcaoSucess() {
  return {
    type: '@product/DELETAR_OPCAO_SUCESS',
  };
}
export function deleteOpcaoFailure() {
  return {
    type: '@product/DELETAR_OPCAO_FAILURE',
  };
}
