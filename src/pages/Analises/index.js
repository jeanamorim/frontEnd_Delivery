/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useMemo, useEffect } from 'react';
import { format, subDays, addDays, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';
import { Icon, Button } from 'semantic-ui-react';
import pt from 'date-fns/locale/pt';
import {
  MdChevronLeft,
  MdChevronRight,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from 'react-icons/md';
import { toast } from 'react-toastify';
import axios from 'axios';

import { formatPrice } from '../../util/format';
import api from '../../services/api';
import {
  Container,
  Time,
  Content,
  Header,
  Pagination,
  ContainerTable,
  PageContent,
} from './styles';
import { dateLanguage } from '../../locales';
import Animation from '../../components/Animation';
import * as loadingData from '../../assets/animations/loading.json';

export default function Analises() {
  const [date, setDate] = useState(new Date());
  const [relatorio, setRelatorio] = useState([]);
  const [status, setStatus] = useState([]);
  const porcentagemApp = (status.faturamentoTotal * 4) / 100;

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date],
  );

  useEffect(() => {
    async function loadStatus() {
      try {
        const response = await axios
          .all([
            api.get('/totalDinheiro', {
              params: { date },
            }),
            api.get('/totalCancelado', {
              params: { date },
            }),
            api.get('/totalCartao', {
              params: { date },
            }),
            api.get('/totalEntregue', {
              params: { date },
            }),
            api.get('/totalPedido', {
              params: { date },
            }),
            api.get('/totalPendente', {
              params: { date },
            }),
            api.get('/valorTotal', {
              params: { date },
            }),
            api.get('/faturamentoTotal'),
          ])
          .then(
            axios.spread(
              (
                totalDinheiro,
                totalCancelado,
                totalCartao,
                totalEntregue,
                totalPedido,
                totalPendente,
                valorTotal,
                faturamentoTotal,
              ) => ({
                totalDinheiro: totalDinheiro.data[0].subtotal,
                totalCancelado: totalCancelado.data[0].total,
                totalCartao: totalCartao.data[0].total,
                totalEntregue: totalEntregue.data[0].total,
                totalPedido: totalPedido.data[0].total,
                totalPendente: totalPendente.data[0].total,
                valorTotal: valorTotal.data[0].subtotal,
                valorTotalFrete: valorTotal.data[0].delivery_fee,
                faturamentoTotal: faturamentoTotal.data[0].subtotal,
              }),
            ),
          );

        setStatus(response);
      } catch (err) {
        toast.error('Falha ao conectar com o servidor');
      }
    }
    loadStatus();
  }, [date]);

  // relatorio dos pedidos por dia do estabelecimento
  useEffect(() => {
    async function loadPedidos() {
      try {
        const response = await api.get('relatoriopedidos', {
          params: { date },
        });
        setRelatorio(response.data);
      } catch (err) {
        toast.error('Falha ao conectar com o servidor');
      }
    }
    loadPedidos();
  }, [date]);

  function handleDay(add) {
    setDate(add ? addDays(date, 1) : subDays(date, 1));
  }

  const loading = <Animation width={40} height={40} animation={loadingData} />;

  const className = status => {
    switch (status) {
      case 'ENTREGUE':
        return 'text-success';
      case 'ENVIADO':
        return 'text-success';
      case 'PENDENTE':
        return 'text-info';
      case 'PRODUCAO':
        return 'text-info';
      case 'CANCELADO':
        return 'text-danger';
      default:
        return '';
    }
  };

  const statusName = status => {
    switch (status) {
      case 'ENVIADO':
        return 'Enviado';
      case 'PRODUCAO':
        return 'Produção';
      case 'CANCELADO':
        return 'Cancelado';
      case 'PENDENTE':
        return 'Pendente';
      case 'ENTREGUE':
        return 'Entregue';
      default:
        return '';
    }
  };
  function refreshPage() {
    window.location.reload();
  }
  return (
    <div className="content-wrapper" style={{ marginTop: 40 }}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-12">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <Button onClick={refreshPage}>
                      <Icon name="sync" /> Atualizar
                    </Button>
                  </div>
                  <div className="panel-body">
                    <Header>
                      <header>
                        <button type="button" onClick={() => handleDay(false)}>
                          <MdChevronLeft size={43} color="#FF4500" />
                        </button>
                        <strong>{dateFormatted}</strong>
                        <button type="button" onClick={() => handleDay(true)}>
                          <MdChevronRight size={43} color="#FF4500" />
                        </button>
                      </header>
                    </Header>
                    <Container>
                      <div>Quantidades</div>

                      <ul>
                        <Time>
                          <strong>{status.totalPedido || loading}</strong>
                          <span>PEDIDOS</span>
                        </Time>
                        <Time>
                          <strong>{status.totalEntregue || loading}</strong>
                          <span>ENTREGUES</span>
                        </Time>
                        <Time>
                          <strong>{status.totalPendente || loading}</strong>
                          <span>PENDENTES</span>
                        </Time>
                        <Time>
                          <strong>{status.totalCancelado || loading}</strong>
                          <span>CANCELADOS</span>
                        </Time>
                      </ul>

                      <div>Faturamentos</div>

                      <ul>
                        <Time>
                          <strong>
                            {formatPrice(status.valorTotal) || loading}
                          </strong>
                          <span>VALOR TOTAL</span>
                        </Time>

                        <Time>
                          <strong>
                            {formatPrice(status.totalDinheiro) || loading}
                          </strong>
                          <span>DINHEIRO</span>
                        </Time>
                        <Time>
                          <strong>
                            {formatPrice(status.totalCartao) || loading}
                          </strong>
                          <span>CARTÃO</span>
                        </Time>

                        <Time>
                          <strong>
                            {formatPrice(status.valorTotalFrete) || loading}
                          </strong>
                          <span>VALOR DAS ENTREGAS</span>
                        </Time>
                      </ul>

                      <Content>
                        <ul>
                          <li>
                            <span>FATURAMENTO TOTAL ATE HOJE</span>
                            <strong>
                              {formatPrice(status.faturamentoTotal) || loading}
                            </strong>
                          </li>

                          <li>
                            <span>VALOR A SER PAGO NO MÊS</span>
                            <strong>
                              {formatPrice(porcentagemApp) || loading}
                            </strong>
                          </li>
                        </ul>
                      </Content>
                    </Container>
                    {relatorio.length > 0 ? (
                      <ContainerTable>
                        <PageContent>
                          <thead>
                            <tr>
                              <th>DATA</th>
                              <th>QTD. PRODUTO</th>
                              <th>PREÇO</th>
                              <th>ENTREGA</th>
                              <th>SUBTOTAL</th>
                              <th>FORM. PAGAMENTO</th>
                              <th>STATUS</th>
                            </tr>
                          </thead>
                          <tbody>
                            {relatorio.map(item => (
                              <>
                                <tr key={item.id}>
                                  <td>
                                    <Link
                                      to={{
                                        pathname: '/order',
                                        search: `?id=${item.id}`,
                                        state: {
                                          orderData: item,
                                        },
                                      }}
                                    >
                                      {format(parseISO(item.date), 'Pp', {
                                        locale: dateLanguage,
                                      })}
                                    </Link>
                                  </td>
                                  <td>{item.order_details.length}</td>
                                  <td>
                                    {formatPrice(item.order_details[0].price)}
                                  </td>
                                  <td> {formatPrice(item.delivery_fee)}</td>
                                  <td>{formatPrice(item.total)}</td>
                                  <td>{item.payment_method}</td>
                                  <td className={className(item.status)}>
                                    {statusName(item.status)}
                                  </td>
                                </tr>
                                <br />
                              </>
                            ))}
                          </tbody>
                        </PageContent>

                        <Pagination>
                          <button type="button">
                            <MdKeyboardArrowLeft size={20} color="#7d40e7" />
                          </button>

                          <span>Página 1</span>

                          <button type="button">
                            <MdKeyboardArrowRight size={20} color="#7d40e7" />
                          </button>
                        </Pagination>
                      </ContainerTable>
                    ) : null}
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
