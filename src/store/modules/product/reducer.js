/* eslint-disable no-return-assign */
import produce from 'immer';

const initialState = {
  editProduct: false,
  modalCadastrarProduct: false,
  ProductToEdit: [],
  ProductCategoria: [],
  ListProducts: [],
  NewVariacao: [],
  loading: false,
};
function Product(state = initialState, action) {
  switch (action.type) {
    case '@product/GET_PRODUCT_SUCCESS':
      return (state = {
        ...state,
        ProductCategoria: action.product,
        loading: false,
      });
    case ' @product/GET_PRODUCT_REQUEST':
      return (state = {
        ...state,
        loading: true,
      });
    case '@product/GET_PRODUCT_FAILURE':
      return (state = {
        ...state,
        loading: false,
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
    case '@product/REMOVE_VARIACAO': {
      return produce(state, draft => {
        const productIndex = draft.ProductToEdit.variacao.findIndex(
          p => p.id === action.id,
        );
        if (productIndex >= 0) {
          draft.ProductToEdit.variacao.splice(productIndex, 1);
        }
      });
    }
    case '@product/REMOVE_OPCAO': {
      return produce(state, draft => {
        draft.ProductToEdit.variacao.forEach(item => {
          const opcaoIndex = item.opcao.findIndex(o => o.id === action.id);

          if (opcaoIndex >= 0) {
            // console.log(item.opcao[opcaoIndex].name);
            item.opcao.splice(opcaoIndex, 1);
          }
        });
      });
    }

    default:
      return state;
  }
}

export default Product;
