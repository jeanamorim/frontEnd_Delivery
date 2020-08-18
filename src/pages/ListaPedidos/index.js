/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import Animation from '../../components/Animation';
import * as loadingData from '../../assets/animations/loading.json';
import { history } from '../../services/history';
import api from '../../services/api';
import { formatPrice } from '../../util/format';

import Table from '../../components/Table';
import translate, { dateLanguage } from '../../locales';

export default function Orders() {
  const [orders, setOrders] = useState();
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

  const loading = <Animation width={30} height={30} animation={loadingData} />;

  let data;

  if (orders) {
    data = orders.map(order => ({
      id: order.id,
      user_name: order.user.name,
      ValorEntrega: formatPrice(order.delivery_fee),
      total: formatPrice(order.total),

      status:
        Number(updatingStatus) === order.id ? (
          <div>{loading}</div>
        ) : (
          <b className={className(order.status)}>{statusName(order.status)}</b>
        ),
      data: format(parseISO(order.date), 'Pp', {
        locale: dateLanguage,
      }),
      view: (
        <Link
          to={{
            pathname: '/order',
            search: `?id=${order.id}`,
            state: {
              orderData: order,
            },
          }}
        >
          Ver pedido
        </Link>
      ),
    }));
  }

  const columns = [
    {
      label: 'N°',
      field: 'id',
      sort: 'asc',
      width: 10,
    },
    {
      label: 'Nome do Cliente',
      field: 'user_name',
      sort: 'asc',
      width: 30,
    },
    {
      label: 'Status',
      field: 'status',
      sort: 'asc',
      width: 20,
    },
    {
      label: 'Valor da entrega',
      field: 'ValorEntrega',
      sort: 'asc',
      width: 20,
    },

    {
      label: 'Valor Total',
      field: 'total',
      sort: 'asc',
      width: 20,
    },
    {
      label: 'Data do Pedido',
      field: 'data',
      sort: 'asc',
      width: 50,
    },

    {
      label: '',
      field: 'view',
      sort: 'asc',
      width: 10,
    },
  ];

  const rows = [
    {
      id: loading,
      user_name: loading,
      ValorEntrega: loading,
      total: loading,
      status: loading,
      data: loading,
      view: loading,
    },
  ];

  return (
    <div className="content-wrapper" style={{ marginTop: 40 }}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-default">
              <div className="panel-heading">Lista de Pedidos</div>
              <div className="panel-body">
                <div style={{ display: 'flex' }}>
                  <button
                    onClick={history.goBack}
                    style={{
                      background: '#32cd32',
                      width: 150,
                      color: '#fff',
                      margin: 1,
                      borderRadius: 5,
                      borderColor: '#fff',
                    }}
                  >
                    Voltar
                  </button>
                </div>
                <Table rows={data || rows} columns={columns} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
