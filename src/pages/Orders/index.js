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

import './styles.css';
import api from '../../services/api';

export default function Pedidos() {
  const [pendente_, setPendente_] = useState([]);
  const [producao_, setProducao_] = useState([]);
  const [enviado_, setEnviado_] = useState([]);
  const [entregue_, setEntregue_] = useState([]);
  const [cancelado_, setCancelado_] = useState([]);
  const [date] = useState(new Date());
  const [render, setRender] = useState(false);
  const [, setValue] = useState({});
  async function handleChange(event) {
    const status = event.target.value;
    const orderId = event.target.id;
    setValue({
      id: Number(orderId),
      status,
    });

    try {
      await api.put(`/orders/${orderId}`, {
        status,
      });

      if (status === 'CANCELADO') {
        await api.delete(`/orders/${orderId}`);
        toast.success('Pedido cancelado');
      }

      setRender(!render);
    } catch (err) {
      if (err.response) {
        toast.error('Erro no servidor');
      } else {
        toast.error('Erro ao conectar com o servidor');
      }
    }
  }
  useEffect(() => {
    async function loadStatusPend() {
      try {
        const response = await api.get(`status/PENDENTE`, {
          params: { date },
        });
        console.tron.log(response.data);
        const data = response.data.map(statusPendenetes => ({
          ...statusPendenetes,
          timeDistance: formatDistanceStrict(
            parseISO(statusPendenetes.date),
            new Date(),
            { addSuffix: true, locale: pt },
          ),
        }));

        setPendente_(data);
      } catch (err) {
        if (err.response) {
          toast.error('Erro no servidor');
        } else {
          toast.error('Falha ao conectar com o servidor');
        }
      }
    }

    loadStatusPend();
  }, [date, render]);
  useEffect(() => {
    async function loadStatusProd() {
      try {
        const response = await api.get(`status/PRODUCAO`, {
          params: { date },
        });

        const data = response.data.map(statusAprovado => ({
          ...statusAprovado,
          timeDistance: formatDistanceStrict(
            parseISO(statusAprovado.date),
            new Date(),
            { addSuffix: true, locale: pt },
          ),
        }));

        setProducao_(data);
      } catch (err) {
        if (err.response) {
          toast.error('Erro no servidor');
        } else {
          toast.error('Falha ao conectar com o servidor');
        }
      }
    }

    loadStatusProd();
  }, [date, render]);
  useEffect(() => {
    async function loadStatusEnv() {
      try {
        const response = await api.get(`status/ENVIADO`, {
          params: { date },
        });

        const data = response.data.map(statusEnviado => ({
          ...statusEnviado,
          timeDistance: formatDistanceStrict(
            parseISO(statusEnviado.date),
            new Date(),
            { addSuffix: true, locale: pt },
          ),
        }));

        setEnviado_(data);
      } catch (err) {
        if (err.response) {
          toast.error('Erro no servidor');
        } else {
          toast.error('Falha ao conectar com o servidor');
        }
      }
    }

    loadStatusEnv();
  }, [date, render]);
  useEffect(() => {
    async function loadStatusCanc() {
      try {
        const response = await api.get(`status/CANCELADO`, {
          params: { date },
        });

        const data = response.data.map(statusCancelado => ({
          ...statusCancelado,
          timeDistance: formatDistanceStrict(
            parseISO(statusCancelado.date),
            new Date(),
            { addSuffix: true, locale: pt },
          ),
        }));

        setCancelado_(data);
      } catch (err) {
        if (err.response) {
          toast.error('Erro no servidor');
        } else {
          toast.error('Falha ao conectar com o servidor');
        }
      }
    }

    loadStatusCanc();
  }, [date, render]);
  useEffect(() => {
    async function loadStatusEntre() {
      try {
        const response = await api.get(`status/ENTREGUE`, {
          params: { date },
        });

        const data = response.data.map(statusEntregue => ({
          ...statusEntregue,
          timeDistance: formatDistanceStrict(
            parseISO(statusEntregue.date),
            new Date(),
            { addSuffix: true, locale: pt },
          ),
        }));

        setEntregue_(data);
      } catch (err) {
        if (err.response) {
          toast.error('Erro no servidor');
        } else {
          toast.error('Falha ao conectar com o servidor');
        }
      }
    }

    loadStatusEntre();
  }, [date, render]);

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
                  style={{
                    textAlign: 'center',
                    backgroundColor: '#FDC995',
                    width: '20%',
                    height: 40,
                    color: '#000',
                    margin: 1,
                    borderWidth: 2,
                    borderColor: '#000',
                    border: 10,
                  }}
                >
                  <div
                    style={{
                      background: '#F4A460',
                      color: '#fff',
                      borderWidth: 2,
                      borderColor: '#000',
                    }}
                  >
                    <Icon
                      name="exclamation triangle"
                      style={{ color: '#fff' }}
                    />
                    PENDENTE
                  </div>
                </div>

                <div
                  style={{
                    textAlign: 'center',
                    background: '#FDC995',
                    width: '20%',
                    height: 40,
                    color: '#fff',
                    margin: 1,
                    borderWidth: 2,
                    borderColor: '#000',
                  }}
                >
                  <div
                    style={{
                      background: '#F4A460',
                      color: '#fff',
                      borderWidth: 2,
                      borderColor: '#000',
                    }}
                  >
                    <Icon name="home" style={{ color: '#fff' }} />
                    PRODUZINDO
                  </div>
                </div>
                <div
                  style={{
                    textAlign: 'center',
                    background: '#FDC995',
                    width: '20%',
                    height: 40,
                    color: '#fff',
                    margin: 1,
                    borderWidth: 2,
                    borderColor: '#000',
                  }}
                >
                  <div
                    style={{
                      background: '#F4A460',
                      color: '#fff',
                      borderWidth: 2,
                      borderColor: '#000',
                    }}
                  >
                    <Icon name="motorcycle" style={{ color: '#fff' }} />
                    ENVIADO
                  </div>
                </div>
                <div
                  style={{
                    textAlign: 'center',
                    background: '#FDC995',
                    width: '20%',
                    height: 40,
                    color: '#fff',
                    margin: 1,
                    borderWidth: 2,
                    borderColor: '#000',
                  }}
                >
                  <div
                    style={{
                      background: '#F4A460',
                      color: '#fff',
                      borderWidth: 2,
                      borderColor: '#000',
                    }}
                  >
                    <Icon name="check" style={{ color: '#fff' }} />
                    ENTREGUE
                  </div>
                  <Icon name="chevron down" style={{ color: '#fff' }} />
                </div>
                <div
                  style={{
                    textAlign: 'center',
                    background: '#FDC995',
                    width: '20%',
                    height: 40,
                    color: '#fff',
                    margin: 1,
                    borderWidth: 2,
                    borderColor: '#000',
                  }}
                >
                  <div
                    style={{
                      background: '#F4A460',
                      color: '#fff',
                      borderWidth: 2,
                      borderColor: '#000',
                    }}
                  >
                    <Icon name="ban" style={{ color: '#fff' }} />
                    CANCELADO
                  </div>
                  <Icon name="chevron down" style={{ color: '#fff' }} />
                </div>
              </div>

              <div className="menuPedidosstatus" style={{ display: 'flex' }}>
                <div style={{ width: '20%', marginTop: 5 }}>
                  <div className="board" id="boardjsplain">
                    <>
                      {pendente_.map(order => (
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
                                onClick={handleChange}
                                type="button"
                                value="CANCELADO"
                              >
                                <Icon name="x icon" style={{ color: '#fff' }} />
                              </Button>

                              <Button
                                style={{ width: '50%', background: '#048923' }}
                                id={order.id}
                                onClick={handleChange}
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
                      {producao_.map(order => (
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
                                <Icon name="print" style={{ color: '#fff' }} />
                              </Button>

                              <Button
                                style={{ width: '50%', background: '#5F8DF1' }}
                                id={order.id}
                                onClick={handleChange}
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
                        {enviado_.map(order => (
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
                                  onClick={handleChange}
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
                      {entregue_.map(order => (
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
                                <Icon name="print" style={{ color: '#fff' }} />
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
                        {cancelado_.map(order => (
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
