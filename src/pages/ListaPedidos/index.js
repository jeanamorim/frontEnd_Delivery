/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import { Modal, Button, Icon, Header, Divider } from 'semantic-ui-react';
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdSearch,
} from 'react-icons/md';
import Animation from '../../components/Animation';
import * as loadingData from '../../assets/animations/loading.json';
import { history } from '../../services/history';
import api from '../../services/api';
import { formatPrice } from '../../util/format';
import translate, { dateLanguage } from '../../locales';
import {
  Container,
  PageContent,
  Pagination,
  PageActions,
  Title,
} from './styles';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [updatingStatus, setUpdatingStatus] = useState(0);

  useEffect(() => {
    async function loadOrders() {
      const response = await api.get('/orders');
      // console.log(response.data);

      setOrders(response.data);
      if (updatingStatus !== 0) {
        setUpdatingStatus(0);
        toast.success(translate('status_updated_success'));
      }
    }

    loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  //  const loading = <Animation width={30} height={30} animation={loadingData} />;

  // let data;

  // if (orders) {
  //   data = orders.map(order => ({
  //     id: order.id,
  //     user_name: order.user.name,
  //     ValorEntrega: formatPrice(order.delivery_fee),
  //     total: formatPrice(order.total),

  //     status:
  //       Number(updatingStatus) === order.id ? (
  //         <div>{loading}</div>
  //       ) : (
  //         <b className={className(order.status)}>{statusName(order.status)}</b>
  //       ),
  //     data: format(parseISO(order.date), 'Pp', {
  //       locale: dateLanguage,
  //     }),
  //     view: (
  //       <Link
  //         to={{
  //           pathname: '/order',
  //           search: `?id=${order.id}`,
  //           state: {
  //             orderData: order,
  //           },
  //         }}
  //       >
  //         Ver pedido
  //       </Link>
  //     ),
  //   }));
  // }

  function refreshPage() {
    window.location.reload();
  }

  return (
    <>
      <div className="content-wrapper" style={{ marginTop: 40 }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-12">
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <Button onClick={history.goBack}>
                        <Icon name="arrow left" />
                        Voltar
                      </Button>
                      <Button onClick={refreshPage}>
                        <Icon name="sync" /> Atualizar
                      </Button>
                    </div>

                    <div className="panel-body">
                      <Title>
                        <strong>Pedidos</strong>
                      </Title>
                      <PageActions>
                        <div>
                          <i>
                            <MdSearch size={20} />
                          </i>

                          <input type="text" placeholder="Buscar por codigo" />
                        </div>
                        {/* <div style={{ display: 'flex' }}>
                          <Oferta />
                        </div> */}
                      </PageActions>
                      <Divider />
                      {orders.length > 0 ? (
                        <Container>
                          <PageContent>
                            <thead>
                              <tr>
                                <th>CODIGO</th>
                                <th>CLIENTE</th>
                                <th>STATUS</th>
                                <th>V. ENTREGA</th>
                                <th>V. TOTAL</th>
                                <th>DATA PEDIDO</th>
                              </tr>
                            </thead>
                            <tbody>
                              {orders.map(order => (
                                <>
                                  <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.user.name}</td>
                                    <td className={className(order.status)}>
                                      {statusName(order.status)}
                                    </td>
                                    <td>{formatPrice(order.delivery_fee)}</td>
                                    <td>{formatPrice(order.total)}</td>
                                    <td>
                                      {format(parseISO(order.date), 'Pp', {
                                        locale: dateLanguage,
                                      })}
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
                        </Container>
                      ) : (
                        <Container
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                          }}
                        >
                          <div>Nenhum produto aqui...</div>
                        </Container>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
