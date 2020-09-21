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
import { formatPrice } from '../../util/format';
import Animation from '../../components/Animation';
import * as loadingData from '../../assets/animations/loading.json';
import api from '../../services/api';
import { connect, disconnect, subscribeToNewDevs } from '../../services/socket';
import OrderDetails from '../../Modals/ViewOrdens';
import socketio from 'socket.io-client';
import { openViewPedido } from '../../store/modules/pedidos/actions';
import Pendente from '../../components/Pedidos/Pendente';
import Producao from '../../components/Pedidos/Producao';
import Enviado from '../../components/Pedidos/Enviado';
import Entregue from '../../components/Pedidos/Entregue';
import Cancelado from '../../components/Pedidos/Cancelado';

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

  function executeAudio() {
    const audio = new Audio(
      'https://assets.coderrocketfuel.com/pomodoro-times-up.mp3',
    );
    audio.play();
  }

  const socket = useMemo(
    () =>
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
              {openModal === true ? <OrderDetails /> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
