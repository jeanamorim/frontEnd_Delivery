// CADASTRAR UMA CATEGORIA
export function postCategoriaRequest(categoria) {
  return {
    type: '@product/POST_CATEGORIA_REQUEST',
    payload: { categoria },
  };
}

export function postCategoriaSucess() {
  return {
    type: '@product/POST_CATEGORIA_SUCCESS',
  };
}
export function postCategoriaFailure() {
  return {
    type: '@product/POST_CATEGORIA_FAILURE',
  };
}
// LISTAR CATEGORIAS
export function getCategoriasRequest() {
  return {
    type: '@product/GET_CATEGORIA_REQUEST',
  };
}
export const getCategoriasSuccess = product => ({
  type: '@product/GET_CATEGORIA_SUCCESS',
  product,
});
export function getCategoriaFailure() {
  return {
    type: '@product/GET_CATEGORIA_FAILURE',
  };
}
// DELETAR UMA CATEGORIA
export function deletOfemrtasRequest(id) {
  return {
    type: '@product/DELETE_OFfERTA_REQUEST',
    payload: { id },
  };
}
export const deletOfemrtasSucess = () => ({
  type: '@product/DELETE_OFEfRTA_SUCCESS',
});
export function deletOfertmasFailure() {
  return {
    type: '@product/DELETE_OFEfRTA_FAILURE',
  };
}
