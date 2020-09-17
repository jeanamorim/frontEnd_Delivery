export const openViewPedido = pedido => ({
  type: '@pedido/VIEW_SUCCESS_OPEN',
  pedido,
});
export const CloseViewPedido = () => ({
  type: '@pedido/VIEW_SUCCESS_CLOSE',
});

export function getPedidosRequest() {
  return {
    type: '@product/GET_PEDIDOS_REQUEST',
  };
}
export function getPendente(data) {
  return {
    type: '@product/GET_PENDENTE',
    data,
  };
}
export function getProducao(data) {
  return {
    type: '@product/GET_PRODUCAO',
    data,
  };
}
export function getEnviado(data) {
  return {
    type: '@product/GET_ENVIADO',
    data,
  };
}
export function getEntregue(data) {
  return {
    type: '@product/GET_ENTREGUE',
    data,
  };
}
export function getCancelado(data) {
  return {
    type: '@product/GET_CANCELADO',
    data,
  };
}
// alterar status

export function updateStatus(status, orderId) {
  return {
    type: '@product/UPDATE_STATUS',
    payload: { status, orderId },
  };
}
