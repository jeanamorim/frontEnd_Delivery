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

export const openEditProduct = product => ({
  type: '@product/EDIT_SUCCESS_OPEN',
  product,
});
export const closeEditProduct = () => ({
  type: '@product/EDIT_SUCCESS_CLOSE',
});
