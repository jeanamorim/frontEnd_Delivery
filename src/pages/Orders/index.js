/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/order */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { parseISO, formatDistanceStrict } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Button, Icon } from 'semantic-ui-react';
import { formatPrice } from '../../util/format';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPedidosRequest,
  updateStatus,
} from '../../store/modules/pedidos/actions';
import './styles.css';
import api from '../../services/api';

export default function Pedidos() {
  const dispatch = useDispatch();
  const pedidos = useSelector(state => state.pedidos);
  const [pendente, setPendente] = useState([]);
  const [producao, setProducao] = useState([]);
  const [enviado, setEnviado] = useState([]);
  const [entregue, setEntregue] = useState([]);
  const [cancelado, setCancelado] = useState([]);

  useEffect(() => {
    dispatch(getPedidosRequest());
    setPendente(pedidos.pendente);
    setProducao(pedidos.producao);
    setEnviado(pedidos.enviado);
    setEntregue(pedidos.entregue);
    setCancelado(pedidos.cancelado);
  }, [pedidos]);
  function updateStatuss(status, orderId) {
    dispatch(updateStatus(status, orderId));
  }

  // const loading = <Animation width={30} height={30} animation={loadingData} />;
  function refreshPage() {
    window.location.reload();
  }
  return (
    <div className="content-wrapper" style={{ marginTop: 20 }}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-default">
              <div className="panel-heading">
                <div style={{ display: 'flex' }}>
                  <Link to="/lista">
                    <Button>
                      <Icon name="list alternate" /> Pedidos
                    </Button>
                  </Link>
                  <Button onClick={refreshPage}>
                    <Icon name="sync" /> Atualizar
                  </Button>
                  <Button onClick={refreshPage}>
                    <Icon name="volume up" /> Testar som
                  </Button>
                </div>
              </div>

              <div style={{ display: 'flex' }}>
                <div
                  className="name_status"
                  style={{ borderColor: '#000', borderWidth: 3 }}
                >
                  <div className="name_icon_status">
                    <Icon name="exclamation triangle" />
                    PENDENTE
                  </div>
                </div>

                <div className="name_status">
                  <div className="name_icon_status">
                    <Icon name="home" />
                    PRODUZINDO
                  </div>
                </div>
                <div className="name_status">
                  <div className="name_icon_status">
                    <Icon name="motorcycle" />
                    ENVIADO
                  </div>
                </div>
                <div className="name_status">
                  <div className="name_icon_status">
                    <Icon name="check" />
                    ENTREGUE
                  </div>
                  <Icon name="chevron down" />
                </div>
                <div className="name_status">
                  <div className="name_icon_status">
                    <Icon name="ban" />
                    CANCELADO
                  </div>
                  <Icon name="chevron down" />
                </div>
              </div>

              <div style={{ display: 'flex' }}>
                <div style={{ width: '20%', marginTop: 5 }}>
                  <div className="board" id="boardjsplain">
                    <>
                      {pendente.map(order => (
                        <div className="cards" key={order.id}>
                          <div
                            className="panel panel-default"
                            style={{ borderColor: '#F4A460' }}
                          >
                            <Link
                              to={{
                                pathname: '/order',
                                search: `?id=${order.id}`,
                                state: {
                                  orderData: order,
                                },
                              }}
                              className="block-anchor panel-footer text-center"
                              style={{
                                background: '#F4A460',
                                color: '#fff',
                                height: 35,
                              }}
                            >
                              {order.timeDistance}
                            </Link>
                            <div className="panel-body bk-secondary text-dark">
                              <div className="stat-panel">
                                <div className="bairro">
                                  {order.ship_neighborhood}
                                </div>
                                <div
                                  className="text-right"
                                  style={{
                                    marginTop: 10,
                                    display: 'flex',
                                  }}
                                >
                                  <div style={{ color: '#D2691E' }}>
                                    #{order.id}
                                  </div>
                                  <div style={{ marginLeft: '12%' }}>
                                    {formatPrice(order.total)}
                                  </div>
                                  <div style={{ marginLeft: '5%' }}>
                                    {order.payment_method}
                                  </div>
                                </div>

                                <div
                                  className="stat-panel-title"
                                  style={{ marginTop: -20 }}
                                >
                                  {order.order_details.map(image => (
                                    <img
                                      className="image"
                                      src={image.product.image.url}
                                      alt={image.product.name}
                                    />
                                  ))}
                                </div>
                                <div className="stat-panel-title">
                                  {order.order_details.map(qtd => (
                                    <div className="qtd"> {qtd.quantity}x </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div style={{ display: 'flex', marginTop: -15 }}>
                              <Button
                                style={{
                                  width: '50%',
                                  background: '#F43C04',
                                  marginLeft: 4,
                                }}
                                id={order.id}
                                // onClick={handleChange}
                                type="button"
                                value="CANCELADO"
                              >
                                <Icon name="x icon" />
                              </Button>

                              <Button
                                style={{ width: '50%', background: '#048923' }}
                                id={order.id}
                                onClick={() =>
                                  updateStatuss('PRODUCAO', order.id)
                                }
                                type="button"
                                value="PRODUCAO"
                              >
                                <Icon
                                  name="thumbs up"
                                  style={{ color: '#fff' }}
                                />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  </div>
                </div>
                <div style={{ width: '20%', marginTop: 5 }}>
                  <div className="board" id="boardjsplain">
                    <>
                      {producao.map(order => (
                        <div className="cards" key={order.id}>
                          <div
                            className="panel panel-default"
                            style={{ borderColor: '#F4A460' }}
                          >
                            <Link
                              to={{
                                pathname: '/order',
                                search: `?id=${order.id}`,
                                state: {
                                  orderData: order,
                                },
                              }}
                              className="block-anchor panel-footer text-center"
                              style={{
                                background: '#F4A460',
                                color: '#fff',
                                height: 35,
                              }}
                            >
                              {order.timeDistance}
                            </Link>
                            <div className="panel-body bk-secondary text-dark">
                              <div className="stat-panel">
                                <div className="bairro">
                                  {order.ship_neighborhood}
                                </div>
                                <div
                                  className="text-right"
                                  style={{
                                    marginTop: 10,
                                    display: 'flex',
                                  }}
                                >
                                  <div style={{ color: '#D2691E' }}>
                                    #{order.id}
                                  </div>
                                  <div style={{ marginLeft: '12%' }}>
                                    {formatPrice(order.total)}
                                  </div>
                                  <div style={{ marginLeft: '5%' }}>
                                    {order.payment_method}
                                  </div>
                                </div>

                                <div
                                  className="stat-panel-title"
                                  style={{ marginTop: -20 }}
                                >
                                  {order.order_details.map(image => (
                                    <img
                                      className="image"
                                      src={image.product.image.url}
                                      alt={image.product.name}
                                    />
                                  ))}
                                </div>
                                <div className="stat-panel-title">
                                  {order.order_details.map(qtd => (
                                    <div className="qtd"> {qtd.quantity}x </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div style={{ display: 'flex', marginTop: -15 }}>
                              <Button
                                style={{
                                  width: '50%',
                                  background: '#999',
                                  marginLeft: 4,
                                }}
                              >
                                <Icon name="print" />
                              </Button>

                              <Button
                                style={{ width: '50%', background: '#5F8DF1' }}
                                id={order.id}
                                onClick={() =>
                                  updateStatuss('ENVIADO', order.id)
                                }
                                type="button"
                                value="ENVIADO"
                              >
                                <Icon
                                  name="motorcycle"
                                  style={{ color: '#fff' }}
                                />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  </div>
                </div>
                <div style={{ width: '20%', marginTop: 5 }}>
                  <div className="board" id="boardjsplain">
                    <div className="list">
                      <>
                        {enviado.map(order => (
                          <div className="cards" key={order.id}>
                            <div
                              className="panel panel-default"
                              style={{ borderColor: '#F4A460' }}
                            >
                              <Link
                                to={{
                                  pathname: '/order',
                                  search: `?id=${order.id}`,
                                  state: {
                                    orderData: order,
                                  },
                                }}
                                className="block-anchor panel-footer text-center"
                                style={{
                                  background: '#F4A460',
                                  color: '#fff',
                                  height: 35,
                                }}
                              >
                                {order.timeDistance}
                              </Link>
                              <div className="panel-body bk-secondary text-dark">
                                <div className="stat-panel">
                                  <div className="bairro">
                                    {order.ship_neighborhood}
                                  </div>
                                  <div
                                    className="text-right"
                                    style={{
                                      marginTop: 10,
                                      display: 'flex',
                                    }}
                                  >
                                    <div style={{ color: '#D2691E' }}>
                                      #{order.id}
                                    </div>
                                    <div style={{ marginLeft: '12%' }}>
                                      {formatPrice(order.total)}
                                    </div>
                                    <div style={{ marginLeft: '5%' }}>
                                      {order.payment_method}
                                    </div>
                                  </div>

                                  <div
                                    className="stat-panel-title"
                                    style={{ marginTop: -20 }}
                                  >
                                    {order.order_details.map(image => (
                                      <img
                                        className="image"
                                        src={image.product.image.url}
                                        alt={image.product.name}
                                      />
                                    ))}
                                  </div>
                                  <div className="stat-panel-title">
                                    {order.order_details.map(qtd => (
                                      <div className="qtd">
                                        {' '}
                                        {qtd.quantity}x{' '}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div style={{ display: 'flex', marginTop: -15 }}>
                                <Button
                                  style={{
                                    width: '50%',
                                    background: '#999',
                                    marginLeft: 4,
                                  }}
                                >
                                  <Icon
                                    name="print"
                                    style={{ color: '#fff' }}
                                  />
                                </Button>

                                <Button
                                  style={{
                                    width: '50%',
                                    background: '#099F24',
                                  }}
                                  id={order.id}
                                  onClick={() =>
                                    updateStatuss('ENTREGUE', order.id)
                                  }
                                  type="button"
                                  value="ENTREGUE"
                                >
                                  <Icon
                                    name="check"
                                    style={{ color: '#fff' }}
                                  />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    </div>
                  </div>
                </div>
                <div style={{ width: '20%', marginTop: 5 }}>
                  <div className="board" id="boardjsplain">
                    <>
                      {entregue.map(order => (
                        <div key={order.id}>
                          <div
                            className="panel panel-default"
                            style={{ borderColor: '#F4A460' }}
                          >
                            <Link
                              to={{
                                pathname: '/order',
                                search: `?id=${order.id}`,
                                state: {
                                  orderData: order,
                                },
                              }}
                              className="block-anchor panel-footer text-center"
                              style={{
                                background: '#F4A460',
                                color: '#fff',
                                height: 35,
                              }}
                            >
                              {order.timeDistance}
                            </Link>
                            <div className="panel-body bk-secondary text-dark">
                              <div className="stat-panel">
                                <div className="bairro">
                                  {order.ship_neighborhood}
                                </div>
                                <div
                                  className="text-right"
                                  style={{
                                    marginTop: 10,
                                    display: 'flex',
                                  }}
                                >
                                  <div style={{ color: '#D2691E' }}>
                                    #{order.id}
                                  </div>
                                  <div style={{ marginLeft: '12%' }}>
                                    {formatPrice(order.total)}
                                  </div>
                                  <div style={{ marginLeft: '5%' }}>
                                    {order.payment_method}
                                  </div>
                                </div>

                                <div
                                  className="stat-panel-title"
                                  style={{ marginTop: -20 }}
                                >
                                  {order.order_details.map(image => (
                                    <img
                                      className="image"
                                      src={image.product.image.url}
                                      alt={image.product.name}
                                    />
                                  ))}
                                </div>
                                <div className="stat-panel-title">
                                  {order.order_details.map(qtd => (
                                    <div className="qtd"> {qtd.quantity}x </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div style={{ marginTop: -15 }}>
                              <Button
                                style={{ width: '100%', background: '#999' }}
                              >
                                <Icon name="print" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  </div>
                </div>
                <div style={{ width: '20%', marginTop: 5 }}>
                  <div className="board" id="boardjsplain">
                    <div className="list">
                      <>
                        {cancelado.map(order => (
                          <div className="cards" key={order.id}>
                            <div
                              className="panel panel-default"
                              style={{ borderColor: '#F4A460' }}
                            >
                              <Link
                                to={{
                                  pathname: '/order',
                                  search: `?id=${order.id}`,
                                  state: {
                                    orderData: order,
                                  },
                                }}
                                className="block-anchor panel-footer text-center"
                                style={{
                                  background: '#F4A460',
                                  color: '#fff',
                                  height: 35,
                                }}
                              >
                                {order.timeDistance}
                              </Link>
                              <div className="panel-body bk-secondary text-dark">
                                <div className="stat-panel">
                                  <div className="bairro">
                                    {order.ship_neighborhood}
                                  </div>
                                  <div
                                    className="text-right"
                                    style={{
                                      marginTop: 10,
                                      display: 'flex',
                                    }}
                                  >
                                    <div style={{ color: '#D2691E' }}>
                                      #{order.id}
                                    </div>
                                    <div style={{ marginLeft: '12%' }}>
                                      {formatPrice(order.total)}
                                    </div>
                                    <div style={{ marginLeft: '5%' }}>
                                      {order.payment_method}
                                    </div>
                                  </div>

                                  <div
                                    className="stat-panel-title"
                                    style={{ marginTop: -20 }}
                                  >
                                    {order.order_details.map(image => (
                                      <img
                                        className="image"
                                        src={image.product.image.url}
                                        alt={image.product.name}
                                      />
                                    ))}
                                  </div>
                                  <div className="stat-panel-title">
                                    {order.order_details.map(qtd => (
                                      <div className="qtd">
                                        {' '}
                                        {qtd.quantity}x{' '}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div style={{ marginTop: -15 }}>
                                <Button
                                  disabled
                                  style={{
                                    width: '100%',
                                    background: '#A52407',
                                  }}
                                >
                                  <Icon
                                    name="x icon"
                                    style={{ color: '#fff' }}
                                  />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
