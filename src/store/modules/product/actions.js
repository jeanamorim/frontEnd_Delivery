// cadastrar um produto
export function postProductRequest(product, avatar) {
  return {
    type: '@product/POST_PRODUCT_REQUEST',
    payload: { product, avatar },
  };
}

export function postProductFailure() {
  return {
    type: '@product/POST_PRODUCT_FAILURE',
  };
}
export function openModalCadastarProduct() {
  return {
    type: '@product/OPEN_MODAL_CADASTRAR_PRODUCT',
  };
}
export function fecharModalCadastarProduct() {
  return {
    type: '@product/CLOSE_MODAL_CADASTRAR_PRODUCT',
  };
}
// lista os produtos por categorias
export function GetProductRequest(id) {
  return {
    type: '@product/GET_PRODUCT_REQUEST',
    payload: { id },
  };
}
export const GetProductSucess = product => ({
  type: '@product/GET_PRODUCT_SUCCESS',
  product,
});
export function GetProductFailure() {
  return {
    type: '@product/UPDATE_FAILURE',
  };
}
// lista todos os produtos, usado para cadastar uma oferta
export function listProductsRequest() {
  return {
    type: '@product/LIST_PRODUCT_REQUEST',
  };
}
export const listProductSucess = product => ({
  type: '@product/LIST_PRODUCT_SUCCESS',
  product,
});
export function listProductFailure() {
  return {
    type: '@product/LIST_PRODUCT_FAILURE',
  };
}
// Edita os produtos

export function updateProductRequest(data, avatar, id, idCat) {
  return {
    type: '@product/EDIT_REQUEST',
    payload: { data, avatar, id, idCat },
  };
}
export const openEditProduct = product => ({
  type: '@product/EDIT_SUCCESS_OPEN',
  product,
});
export const closeEditProduct = () => ({
  type: '@product/EDIT_SUCCESS_CLOSE',
});

// delete product
export function deleteProductRequest(id, idCat) {
  return {
    type: '@product/DELETE_PRODUCT_REQUEST',
    payload: { id, idCat },
  };
}
export function deleteProductSucess() {
  return {
    type: '@product/DELETE_PRODUCT_SUCESS',
  };
}
export function deleteProductFailure() {
  return {
    type: '@product/DELETE_PRODUCT_FAILURE',
  };
}
//
