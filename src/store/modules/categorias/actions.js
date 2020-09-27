// LISTAR CATEGORIAS

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
// EDITAR UMA CATEGORIA
// abrir o modal edit categoria
export function editeCategoriaOpen(categoria) {
  return {
    type: '@product/EDIT_CATEGORIA_OPEN',
    categoria,
  };
}
export function editeCategoriaClose() {
  return {
    type: '@product/EDIT_CATEGORIA_CLOSE',
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
