/* eslint-disable no-return-assign */
const initialState = {
  editProduct: false,
  modalCadastrarProduct: false,
  ProductToEdit: {},
  ProductCategoria: [],
  ListProducts: [],
};
function Product(state = initialState, action) {
  switch (action.type) {
    case '@product/GET_PRODUCT_SUCCESS':
      return (state = {
        ...state,
        ProductCategoria: action.product,
      });
    case '@product/LIST_PRODUCT_SUCCESS':
      return (state = {
        ...state,
        ListProducts: action.product,
      });

    case '@product/EDIT_SUCCESS_OPEN':
      return (state = {
        ...state,
        editProduct: true,
        ProductToEdit: action.product,
      });

    case '@product/EDIT_SUCCESS_CLOSE':
      return (state = {
        ...state,
        editProduct: false,
        ProductToEdit: {},
      });
    case '@product/DELETE_PRODUCT_SUCESS':
      return (state = {
        ...state,
        editProduct: false,
        ProductToEdit: {},
      });
    case '@product/OPEN_MODAL_CADASTRAR_PRODUCT':
      return (state = {
        ...state,
        modalCadastrarProduct: true,
      });
    case '@product/CLOSE_MODAL_CADASTRAR_PRODUCT':
      return (state = {
        ...state,
        modalCadastrarProduct: false,
      });

    default:
      return state;
  }
}

export default Product;
