/* eslint-disable no-return-assign */
const initialState = {
  editCategoria: false,
  CategoriaToEdit: {},
  Categorias: [],
  loading: false,
};
function Categorias(state = initialState, action) {
  switch (action.type) {
    case '@product/GET_CATEGORIA_SUCCESS':
      return (state = {
        ...state,
        Categorias: action.product,
        loading: false,
      });
    case ' @product/GET_CATEGORIA_REQUEST':
      return (state = {
        ...state,
        loading: true,
      });
    case '@product/GET_CATEGORIA_FAILURE':
      return (state = {
        ...state,
        loading: false,
      });
    case '@product/EDIT_CATEGORIA_REQUEST':
      return (state = {
        ...state,
        loading: true,
      });
    case '@product/EDIT_CATEGORIA_SUCCESS':
      return (state = {
        ...state,
        loading: false,
      });

    case '@product/EDIT_CATEGORIA_OPEN':
      return (state = {
        ...state,
        editCategoria: true,
        CategoriaToEdit: action.categoria,
      });
    case '@product/EDIT_CATEGORIA_CLOSE':
      return (state = {
        ...state,
        editCategoria: false,
        CategoriaToEdit: {},
      });

    default:
      return state;
  }
}

export default Categorias;
