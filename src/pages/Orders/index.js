/* eslint-disable no-multi-assign */
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

import Animation from '../../components/Animation';
import * as loadingData from '../../assets/animations/loading.json';
import api from '../../services/api';
import { connect, disconnect, subscribeToNewDevs } from '../../services/socket';
import OrderDetails from '../../Modals/ViewOrdens';
import socketio from 'socket.io-client';

import Pendente from '../../components/Pedidos/Pendente';
import Producao from '../../components/Pedidos/Producao';
import Enviado from '../../components/Pedidos/Enviado';
import Entregue from '../../components/Pedidos/Entregue';
import Cancelado from '../../components/Pedidos/Cancelado';

export default function Pedidos() {
  const dispatch = useDispatch();
  const [status, setstatus] = useState('');
  const [open, setOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [pendente, setPendente_] = useState([]);
  const [producao, setProducao_] = useState([]);
  const [enviado, setEnviado_] = useState([]);
  const [entregue, setEntregue_] = useState([]);
  const [cancelado, setCancelado_] = useState([]);
  const [date] = useState(new Date());
  const profile = useSelector(state => state.user.profile);
  const [loading, setLoading] = useState(false);
  const profile_id = useSelector(state => state.user.profile.id);

  function executeAudio() {
    const audio = new Audio(
      'https://assets.coderrocketfuel.com/pomodoro-times-up.mp3',
    );
    audio.play();
  }

  const socket = useMemo(
    () =>
      // socketio('http://localhost:3005', {
      socketio('https://backend-delivery.herokuapp.com', {
        query: { profile_id },
      }),
    [profile_id],
  );
  useEffect(() => {
    socket.on('new-order', data => {
      const newValor = {
        ...data,
        timeDistance: formatDistanceStrict(parseISO(data.date), new Date(), {
          addSuffix: true,
          locale: pt,
        }),
      };

      setPendente_([...pendente, newValor]);

      executeAudio();
      toast('Novo pedido');
    });
  }, [pendente, socket]);

  const loadingAnimation = (
    <Animation width={10} height={10} animation={loadingData} />
  );

  async function Orders() {
    try {
      const response = await api.get('orders', {
        params: { date },
      });
      const statusLoja = await api.get(`estabelecimento/${profile_id}`);
      setstatus(statusLoja.data[0].status);
      const data = response.data.map(item => ({
        ...item,
        timeDistance: formatDistanceStrict(parseISO(item.date), new Date(), {
          addSuffix: true,
          locale: pt,
        }),
      }));
      const pendentes = data.filter(item => item.status === 'PENDENTE');
      const producaos = data.filter(item => item.status === 'PRODUCAO');
      const enviados = data.filter(item => item.status === 'ENVIADO');
      const entregues = data.filter(item => item.status === 'ENTREGUE');
      const cancelados = data.filter(item => item.status === 'CANCELADO');

      setPendente_(pendentes);
      setProducao_(producaos);
      setEnviado_(enviados);
      setEntregue_(entregues);
      setCancelado_(cancelados);
    } catch (err) {
      if (err.response) {
        toast.error('Erro no servidor');
      } else {
        toast.error('Falha ao conectar com o servidor');
      }
    }
  }

  async function handleChange(event) {
    setLoading(true);
    const status = event.target.value;
    const orderId = event.target.id;

    try {
      await api.put(`/orders/${orderId}`, {
        status,
      });

      if (status === 'CANCELADO') {
        await api.delete(`/orders/${orderId}`);
      }
      Orders();
      setLoading(false);
    } catch (err) {
      if (err.response) {
        toast.error('Erro no servidor');
      } else {
        toast.error('Erro ao conectar com o servidor');
      }
    }
  }
  useEffect(() => {
    Orders();
  }, [date]);

  function viewOrdens(order) {
    setOrders(order);
    setOpen(true);
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
                  <Button onClick={executeAudio}>
                    <Icon name="volume up" /> Testar som
                  </Button>
                </div>
                <div
                  style={{
                    float: 'right',
                    display: 'flex',
                  }}
                >
                  <Button
                    type="button"
                    variant="contained"
                    style={{
                      borderRadius: 5,
                      float: 'right',
                      marginTop: -35,
                    }}
                  >
                    Entrega 20-30 min
                  </Button>
                  {status === 'ABERTO' ? (
                    <Button
                      type="button"
                      positive
                      variant="contained"
                      style={{
                        borderRadius: 5,
                        width: 140,
                        height: 40,
                        float: 'right',
                        marginTop: -35,
                      }}
                    >
                      {status}
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      negative
                      variant="contained"
                      style={{
                        borderRadius: 5,
                        width: 140,
                        height: 40,
                        float: 'right',
                        marginTop: -35,
                      }}
                    >
                      {status}
                    </Button>
                  )}
                </div>
              </div>

              <Grid columns="equal" divided padded>
                <Grid.Row style={{ background: '#fff' }} textAlign="center">
                  <Pendente
                    pendente={pendente}
                    loading={loading}
                    handleChange={handleChange}
                    viewOrdens={viewOrdens}
                  />
                  <Producao
                    producao={producao}
                    loading={loading}
                    handleChange={handleChange}
                    viewOrdens={viewOrdens}
                  />
                  <Enviado
                    enviado={enviado}
                    loading={loading}
                    handleChange={handleChange}
                    viewOrdens={viewOrdens}
                  />
                  <Entregue
                    entregue={entregue}
                    loading={loading}
                    handleChange={handleChange}
                    viewOrdens={viewOrdens}
                  />
                  <Cancelado
                    cancelado={cancelado}
                    loading={loading}
                    handleChange={handleChange}
                    viewOrdens={viewOrdens}
                  />
                </Grid.Row>
              </Grid>

              {open === true ? (
                <OrderDetails pedido={orders} open={open} setOpen={setOpen} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
