/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import { Input, Form, Select } from '@rocketseat/unform';
import { MdClose } from 'react-icons/md';
import { Modal, Button, Icon, Divider, Image } from 'semantic-ui-react';

import { useSelector, useDispatch } from 'react-redux';

import { CloseViewPedido } from '../../store/modules/pedidos/actions';

import {
  StatusPedido,
  TituloPedido,
  NumPedido,
  Time,
  Status,
  NameCliente,
  Name,
  Phone,
  Client,
  Enderecos,
  Pagamento,
  Entrega,
  Rua,
  Bairro,
  Referencia,
  NamePagamento,
  Metodo,
  Produto,
  NameTitulo,
  Valores,
  QuantityProducts,
  NameQuantity,
  Quantity,
  ProdutoOrdens,
  NameDoProduto,
  ValorProducts,
  ValorQuantity,
  ItensX,
  ItensDoProduto,
  NameDoIten,
  ValorDoIten,
  TituloItensProduto,
  Observacao,
  TextObservacao,
} from './styles';

export default function Neew() {
  const dispatch = useDispatch();
  const openModal = useSelector(state => state.pedidos.viewModal);
  const pedido = useSelector(state => state.pedidos.viewOrdens);
  const [order, setOrder] = useState([]);
  const troco = pedido.troco - pedido.total;

  useEffect(() => {
    setOrder(pedido.order_details);
  }, [pedido]);

  function handleFecharModal() {
    dispatch(CloseViewPedido());
  }
  const quantityItens = order.reduce((totalSum, product) => {
    return totalSum + product.quantity;
  }, 0);

  return (
    <Modal open={openModal}>
      <Modal.Header style={{ background: '#F4A460', color: '#fff' }}>
        Pedido
        <MdClose style={{ float: 'right' }} onClick={handleFecharModal} />
      </Modal.Header>

      <TituloPedido>
        <NumPedido>Pedido N° {pedido.id}</NumPedido>
        <Button style={{ float: 'right' }}>Imprimir</Button>
      </TituloPedido>

      <StatusPedido>
        <Time>Realizado eim 12/07/2018</Time>
        <Status>{pedido.status}</Status>
      </StatusPedido>

      <NameCliente>
        <Client>Cliente</Client>
        <Name>{pedido.addressee}</Name>
        <Phone>999999</Phone>
      </NameCliente>
      <Enderecos>
        <Entrega>Entrega</Entrega>
        <Rua>
          {pedido.ship_street} - {pedido.ship_street_n}
        </Rua>
        <Bairro>{pedido.ship_neighborhood}</Bairro>
        <Referencia>{pedido.ship_reference}</Referencia>
        <Bairro>{pedido.ship_complement}</Bairro>
      </Enderecos>

      <Pagamento>
        <NamePagamento>Pagamento</NamePagamento>
        <div
          style={{
            marginTop: 5,
            marginRight: '10%',
            display: 'flex',
            justifyContent: ' space-between',
          }}
        >
          <Metodo>{pedido.payment_method}</Metodo>
          {pedido.payment_method === 'DINHEIRO' ? (
            <Metodo>
              Enviar R$ {troco} para troco. Cliente pagará R$ {pedido.troco}.
            </Metodo>
          ) : null}
        </div>
      </Pagamento>
      {/* Enviar R$ 5,00 para troco. Cliente pagará R$ 40,00. */}
      <Produto>
        <NameTitulo>Produtos</NameTitulo>
      </Produto>
      <Valores>
        <QuantityProducts>
          <NameQuantity>Quant. produtos</NameQuantity>
          <Quantity>{quantityItens}</Quantity>
        </QuantityProducts>
        <QuantityProducts>
          <NameQuantity>Preço Entrega</NameQuantity>
          <Quantity>R$ {pedido.delivery_fee}</Quantity>
        </QuantityProducts>
        <QuantityProducts>
          <NameQuantity>Preço Produto</NameQuantity>
          <Quantity>R$ {pedido.order_details[0].price}</Quantity>
        </QuantityProducts>
        <QuantityProducts>
          <NameQuantity>Preço Total</NameQuantity>
          <Quantity>R$ {pedido.total}</Quantity>
        </QuantityProducts>
      </Valores>
      <Divider />
      {pedido.order_details.map(item => (
        <div>
          <ProdutoOrdens>
            <div
              style={{
                display: 'flex',
                margin: 20,
              }}
            >
              <ItensX>{item.quantity} x</ItensX>
              <Image
                style={{ height: 50, width: 50, borderRadius: 50 }}
                src={item.product.image.url}
              />
              <NameDoProduto>{item.product.name}</NameDoProduto>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <ValorQuantity>
                {item.quantity} x R$ {item.product.price}
              </ValorQuantity>
              <ValorProducts>R$ {item.total}</ValorProducts>
            </div>
          </ProdutoOrdens>
          {/* <div
            style={{
              marginTop: 30,
              marginLeft: '10%',
              marginRight: '10%',
              display: 'flex',
              justifyContent: ' space-between',
            }}
          >
            <TituloItensProduto>Itens do Produto</TituloItensProduto>
            <TituloItensProduto>Valor R$</TituloItensProduto>
          </div>

          <ItensDoProduto>
            <NameDoIten> - - calabresa</NameDoIten>
            <ValorDoIten>R$ 55,00</ValorDoIten>
          </ItensDoProduto> */}
        </div>
      ))}
      {pedido.observacao === '' ? null : (
        <Observacao>
          <TextObservacao>{pedido.observacao}</TextObservacao>
        </Observacao>
      )}

      <div style={{ marginTop: 60 }} />
    </Modal>
  );
}
