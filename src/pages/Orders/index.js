/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/order */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { parseISO, formatDistanceStrict } from 'date-fns';
import pt from 'date-fns/locale/pt';
import {
  Button,
  Icon,
  Divider,
  Grid,
  Image,
  Segment,
  Card,
} from 'semantic-ui-react';
import { formatPrice } from '../../util/format';
import Animation from '../../components/Animation';
import * as loadingData from '../../assets/animations/loading.json';
import api from '../../services/api';
import { connect, disconnect, subscribeToNewDevs } from '../../services/socket';
import OrderDetails from '../../Modals/ViewOrdens';
import socketio from 'socket.io-client';
import { openViewPedido } from '../../store/modules/pedidos/actions';

export default function Pedidos() {
  const dispatch = useDispatch();
  const [updatingStatus, setUpdatingStatus] = useState(0);
  const openModal = useSelector(state => state.pedidos.viewModal);
  const [pendente, setPendente_] = useState([]);
  const [producao, setProducao_] = useState([]);
  const [enviado, setEnviado_] = useState([]);
  const [entregue, setEntregue_] = useState([]);
  const [cancelado, setCancelado_] = useState([]);
  const [date] = useState(new Date());
  const [render, setRender] = useState(false);
  const [, setValue] = useState({});
  const [loading, setLoading] = useState(false);
  const profile_id = useSelector(state => state.user.profile.id);

  const socket = useMemo(
    () =>
      socketio('https://backend-delivery.herokuapp.com', {
        query: { profile_id },
      }),
    [profile_id],
  );
  useEffect(() => {
    socket.on('new-order', data => {
      setPendente_([...pendente, data]);
    });
  }, [pendente, socket]);

  const loadingAnimation = (
    <Animation width={10} height={10} animation={loadingData} />
  );

  async function handleChange(event) {
    setLoading(true);
    const status = event.target.value;
    const orderId = event.target.id;
    setValue({
      id: Number(orderId),
      status,
    });

    if (status !== '') {
      setUpdatingStatus(orderId);
      try {
        await api.put(`/orders/${orderId}`, {
          status,
        });

        if (status === 'cancelled') {
          await api.delete(`/orders/${orderId}`);
        }
        setLoading(false);
        setRender(!render);
      } catch (err) {
        if (err.response) {
          toast.error('Erro no servidor');
        } else {
          toast.error('Erro ao conectar com o servidor');
        }
      }
    }
  }
  async function loadStatusPend() {
    try {
      const response = await api.get(`status/PENDENTE`, {
        params: { date },
      });

      const data = response.data.map(statusPendenetes => ({
        ...statusPendenetes,
        timeDistance: formatDistanceStrict(
          parseISO(statusPendenetes.date),
          new Date(),
          { addSuffix: true, locale: pt },
        ),
      }));
      setPendente_(data);

      if (updatingStatus !== 0) {
        setUpdatingStatus(0);
      }
    } catch (err) {
      if (err.response) {
        toast.error('Erro no servidor');
      } else {
        toast.error('Falha ao conectar com o servidor');
      }
    }
  }
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

      if (updatingStatus !== 0) {
        setUpdatingStatus(0);
      }
    } catch (err) {
      if (err.response) {
        toast.error('Erro no servidor');
      } else {
        toast.error('Falha ao conectar com o servidor');
      }
    }
  }
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

      if (updatingStatus !== 0) {
        setUpdatingStatus(0);
      }
    } catch (err) {
      if (err.response) {
        toast.error('Erro no servidor');
      } else {
        toast.error('Falha ao conectar com o servidor');
      }
    }
  }
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

      if (updatingStatus !== 0) {
        setUpdatingStatus(0);
      }
    } catch (err) {
      if (err.response) {
        toast.error('Erro no servidor');
      } else {
        toast.error('Falha ao conectar com o servidor');
      }
    }
  }
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

      if (updatingStatus !== 0) {
        setUpdatingStatus(0);
      }
    } catch (err) {
      if (err.response) {
        toast.error('Erro no servidor');
      } else {
        toast.error('Falha ao conectar com o servidor');
      }
    }
  }
  useEffect(() => {
    loadStatusProd();
    loadStatusEnv();
    loadStatusCanc();
    loadStatusEntre();
    loadStatusPend();
  }, [date, render]);

  function viewOrdens(order) {
    dispatch(openViewPedido(order));
  }

  // const dispatch = useDispatch();
  // const pedidos = useSelector(state => state.pedidos);
  // const [pendente, setPendente] = useState([]);
  // const [producao, setProducao] = useState([]);
  // const [enviado, setEnviado] = useState([]);
  // const [entregue, setEntregue] = useState([]);
  // const [cancelado, setCancelado] = useState([]);

  // useEffect(() => {
  //   dispatch(getPedidosRequest());
  //   setPendente(pedidos.pendente);
  //   setProducao(pedidos.producao);
  //   setEnviado(pedidos.enviado);
  //   setEntregue(pedidos.entregue);
  //   setCancelado(pedidos.cancelado);
  // }, [pedidos]);
  // function updateStatuss(status, orderId) {
  //   dispatch(updateStatus(status, orderId));
  // }

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

              <Grid columns="equal" divided padded>
                <Grid.Row style={{ background: '#fff' }} textAlign="center">
                  <Grid.Column>
                    <div>
                      <Icon name="exclamation triangle" />
                      PENDENTE
                    </div>
                    <Divider />
                    {pendente.length > 0 ? (
                      <>
                        {pendente.map(order => (
                          <div key={order.id} style={{ marginLeft: 8 }}>
                            <div
                              className="panel panel-default"
                              style={{ borderColor: '#F4A460' }}
                            >
                              <div
                                onClick={() => viewOrdens(order)}
                                className="block-anchor panel-footer text-center"
                                style={{
                                  background: '#F4A460',
                                  color: '#fff',
                                  height: 35,
                                }}
                              >
                                {order.timeDistance}
                              </div>
                              <div className="panel-body bk-secondary text-dark">
                                <Card.Header style={{ fontSize: 10 }}>
                                  {order.ship_neighborhood}
                                </Card.Header>
                                <Card.Meta> #{order.id}</Card.Meta>
                                <Card.Description>
                                  {order.payment_method}
                                  <strong> {formatPrice(order.total)}</strong>
                                </Card.Description>
                                {order.order_details.map(image => (
                                  <div
                                    style={{
                                      alignItems: 'center',

                                      float: 'left',
                                    }}
                                  >
                                    <Image
                                      src={image.product.image.url}
                                      style={{
                                        borderRadius: 50,
                                        height: 30,
                                        width: 30,
                                      }}
                                    />
                                    <div> {image.quantity}x </div>
                                  </div>
                                ))}
                              </div>
                              <div className="ui two buttons">
                                {loading ? (
                                  <Button loading color="red">
                                    Loading
                                  </Button>
                                ) : (
                                  <Button
                                    id={order.id}
                                    color="red"
                                    type="button"
                                    value="CANCELADO"
                                    onClick={handleChange}
                                  >
                                    Cancelar
                                  </Button>
                                )}
                                {loading ? (
                                  <Button loading color="green">
                                    Loading
                                  </Button>
                                ) : (
                                  <Button
                                    id={order.id}
                                    color="green"
                                    onClick={handleChange}
                                    type="button"
                                    value="PRODUCAO"
                                  >
                                    Aceitar
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <div style={{ color: '#999' }}>
                        Nenhum pedido pendente
                        <Divider />
                      </div>
                    )}
                  </Grid.Column>

                  <Grid.Column>
                    <div className="grid">
                      <Icon name="home" />
                      PRODUZINDO
                    </div>
                    <Divider />
                    {producao.length > 0 ? (
                      <>
                        {producao.map(order => (
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
                                <Card.Header style={{ fontSize: 10 }}>
                                  {order.ship_neighborhood}
                                </Card.Header>
                                <Card.Meta> #{order.id}</Card.Meta>
                                <Card.Description>
                                  {order.payment_method}
                                  <strong> {formatPrice(order.total)}</strong>
                                </Card.Description>
                                {order.order_details.map(image => (
                                  <div style={{ float: 'left' }}>
                                    <Image
                                      src={image.product.image.url}
                                      style={{
                                        borderRadius: 50,
                                        height: 30,
                                        width: 30,
                                      }}
                                    />
                                    <div> {image.quantity}x </div>
                                  </div>
                                ))}
                              </div>
                              <div className="ui two buttons">
                                <Button
                                  color="red"
                                  id={order.id}
                                  onClick={handleChange}
                                  type="button"
                                  value="CANCELADO"
                                >
                                  <Icon name="cancel" />
                                </Button>
                                <Button
                                  color="green"
                                  id={order.id}
                                  onClick={handleChange}
                                  type="button"
                                  value="ENVIADO"
                                >
                                  <Icon name="check" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <div style={{ color: '#999' }}>
                        Nenhum pedido em produção
                        <Divider />
                      </div>
                    )}
                  </Grid.Column>

                  <Grid.Column>
                    <div className="grid">
                      <Icon name="motorcycle" />
                      ENVIADO
                    </div>
                    <Divider />
                    {enviado.length > 0 ? (
                      <>
                        {enviado.map(order => (
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
                                <Card.Header style={{ fontSize: 10 }}>
                                  {order.ship_neighborhood}
                                </Card.Header>
                                <Card.Meta> #{order.id}</Card.Meta>
                                <Card.Description>
                                  {order.payment_method}
                                  <strong> {formatPrice(order.total)}</strong>
                                </Card.Description>
                                {order.order_details.map(image => (
                                  <div style={{ float: 'left' }}>
                                    <Image
                                      src={image.product.image.url}
                                      style={{
                                        borderRadius: 50,
                                        height: 30,
                                        width: 30,
                                      }}
                                    />
                                    <div> {image.quantity}x </div>
                                  </div>
                                ))}
                              </div>
                              <div className="ui two buttons">
                                <Button
                                  color="red"
                                  id={order.id}
                                  onClick={handleChange}
                                  type="button"
                                  value="CANCELADO"
                                >
                                  <Icon name="cancel" />
                                </Button>
                                <Button
                                  color="green"
                                  id={order.id}
                                  onClick={handleChange}
                                  type="button"
                                  value="ENTREGUE"
                                >
                                  <Icon name="check" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <div style={{ color: '#999' }}>
                        Nenhum pedido enviado
                        <Divider />
                      </div>
                    )}
                  </Grid.Column>

                  <Grid.Column>
                    <div className="grid">
                      <Icon name="check" />
                      ENTREGUE
                    </div>
                    <Divider />
                    {entregue.length > 0 ? (
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
                                <Card.Header style={{ fontSize: 10 }}>
                                  {order.ship_neighborhood}
                                </Card.Header>
                                <Card.Meta> #{order.id}</Card.Meta>
                                <Card.Description>
                                  {order.payment_method}
                                  <strong> {formatPrice(order.total)}</strong>
                                </Card.Description>
                                {order.order_details.map(image => (
                                  <div style={{ float: 'left' }}>
                                    <Image
                                      src={image.product.image.url}
                                      style={{
                                        borderRadius: 50,
                                        height: 30,
                                        width: 30,
                                      }}
                                    />
                                    <div> {image.quantity}x </div>
                                  </div>
                                ))}
                              </div>
                              <div className="ui two buttons">
                                <Button
                                  color="red"
                                  id={order.id}
                                  onClick={handleChange}
                                  type="button"
                                  value="CANCELADO"
                                >
                                  <Icon name="cancel" />
                                </Button>
                                <Button
                                  color="green"
                                  id={order.id}
                                  type="button"
                                  value="PRODUCAO"
                                >
                                  <Icon name="check" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <div style={{ color: '#999' }}>
                        Nenhum pedido entregue
                        <Divider />
                      </div>
                    )}
                  </Grid.Column>

                  <Grid.Column>
                    <div className="grid">
                      <Icon name="ban" />
                      CANCELADO
                    </div>
                    <Divider />
                    {cancelado.length > 0 ? (
                      <>
                        {cancelado.map(order => (
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
                                <Card.Header style={{ fontSize: 10 }}>
                                  {order.ship_neighborhood}
                                </Card.Header>
                                <Card.Meta> #{order.id}</Card.Meta>
                                <Card.Description>
                                  {order.payment_method}
                                  <strong> {formatPrice(order.total)}</strong>
                                </Card.Description>
                                {order.order_details.map(image => (
                                  <div style={{ float: 'left' }}>
                                    <Image
                                      src={image.product.image.url}
                                      style={{
                                        borderRadius: 50,
                                        height: 30,
                                        width: 30,
                                      }}
                                    />
                                    <div> {image.quantity}x </div>
                                  </div>
                                ))}
                              </div>
                              <div className="ui two buttons">
                                <Button
                                  color="red"
                                  id={order.id}
                                  onClick={handleChange}
                                  type="button"
                                  value="CANCELADO"
                                >
                                  <Icon name="cancel" />
                                </Button>
                                <Button
                                  color="green"
                                  id={order.id}
                                  type="button"
                                  value="PRODUCAO"
                                >
                                  <Icon name="check" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <div style={{ color: '#999' }}>
                        Nenhum pedido cancelado
                        <Divider />
                      </div>
                    )}
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              {openModal === true ? <OrderDetails /> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
