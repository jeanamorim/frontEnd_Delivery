export function postOfertaRequest(offer) {
  return {
    type: '@product/POST_OFERTA_REQUEST',
    payload: { offer },
  };
}
export function postOfertasSucess() {
  return {
    type: '@product/POST_OFERTA_SUCCESS',
  };
}
export function postOfertaFailure() {
  return {
    type: '@product/POST_OFERTA_FAILURE',
  };
}
//
export function GetOfertasRequest() {
  return {
    type: '@product/GET_OFERTA_REQUEST',
  };
}
export const GetOfertaSucess = product => ({
  type: '@product/GET_OFERTA_SUCCESS',
  product,
});
export function GetOfertasFailure() {
  return {
    type: '@product/GET_OFERTAS_FAILURE',
  };
}
//
export function deletOfertasRequest(id) {
  return {
    type: '@product/DELETE_OFERTA_REQUEST',
    payload: { id },
  };
}
export const deletOfertasSucess = () => ({
  type: '@product/DELETE_OFERTA_SUCCESS',
});
export function deletOfertasFailure() {
  return {
    type: '@product/DELETE_OFERTA_FAILURE',
  };
}
