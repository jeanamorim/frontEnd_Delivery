/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import LocalPrintshopIcon from '@material-ui/icons/LocalPrintshop';
import { history } from '../../services/history';

import { formatPrice, formatPhone } from '../../util/format';
import Animation from '../../components/Animation';
import * as loadingData from '../../assets/animations/loading.json';

import api from '../../services/api';
// import { formatPrice } from '../../util/format';
import { ProductTable, Containerr, Status } from './styles';

export default function Order({ location }) {
  const { state } = location;
  const [render, setRender] = useState(false);
  const [, setValue] = useState({});
  const [orderData, setOrderData] = useState([]);

  const params = new URLSearchParams(useLocation().search);
  const id = params.get('id');

  useEffect(() => {
    async function loadOrder() {
      try {
        const response = await api.get(`orders/${id}`);

        setOrderData(response.data);
      } catch (err) {
        if (err.response) {
          toast.error('Erro no servidor');
        } else {
          toast.error('Falha ao conectar com o servidor');
        }
      }
    }

    loadOrder();
  }, [id, state]);

  const loading = <Animation width={30} height={30} animation={loadingData} />;

  return (
    <div className="content-wrapper" style={{ marginTop: 80 }}>
      <div className="panel-body">
        {orderData.map(order => (
          <Containerr>
            <div style={{ display: 'flex' }}>
              <Button
                onClick={history.goBack}
                variant="contained"
                color="primary"
                startIcon={<ArrowBackIcon />}
              >
                Voltar
              </Button>
            </div>

            <header>
              <div
                style={{
                  fontFamily: 'glyphicons-halflings-regular',
                  color: '#000',
                }}
              >
                Nome:{' '}
                <span
                  style={{
                    fontFamily: 'glyphicons-halflings-regular',
                    color: '#000',
                  }}
                >
                  {orderData ? orderData[0].user.name : loading}
                </span>
              </div>
              <div
                style={{
                  fontFamily: 'glyphicons-halflings-regular',
                  color: '#000',
                }}
              >
                Telefone:{' '}
                <span
                  style={{
                    fontFamily: 'glyphicons-halflings-regular',
                    color: '#000',
                  }}
                >
                  {orderData ? formatPhone(orderData[0].user.phone) : loading}
                </span>
              </div>
              <div>
                Entrega:{' '}
                <span
                  style={{
                    fontFamily: 'glyphicons-halflings-regular',
                    color: '#000',
                  }}
                >
                  {order
                    ? `${order.ship_street}, ${order.ship_street_n} - ${order.ship_neighborhood}`
                    : loading}
                </span>
              </div>
              <div
                style={{
                  fontFamily: 'glyphicons-halflings-regular',
                  color: '#000',
                }}
              >
                Pedido N°: <span>{order ? order.id : loading}</span>{' '}
              </div>
            </header>

            <ProductTable>
              <thead>
                <tr>
                  <th />
                  <th
                    style={{
                      fontFamily: 'glyphicons-halflings-regular',
                      color: '#000',
                    }}
                  >
                    Qtd
                  </th>
                  <th
                    style={{
                      fontFamily: 'glyphicons-halflings-regular',
                      color: '#000',
                    }}
                  >
                    Nome
                  </th>
                  <th
                    style={{
                      fontFamily: 'glyphicons-halflings-regular',
                      color: '#000',
                    }}
                  >
                    Preço
                  </th>
                </tr>
              </thead>
              {order.order_details.map(produto => (
                <tbody>
                  <tr>
                    <td>
                      <img
                        src={produto.product.image.url}
                        alt={produto.product.name}
                      />
                    </td>
                    <td>
                      <strong
                        style={{
                          fontFamily: 'glyphicons-halflings-regular',
                          color: '#000',
                        }}
                      >
                        {produto.quantity}x
                      </strong>
                    </td>
                    <td>
                      <strong
                        style={{
                          fontFamily: 'glyphicons-halflings-regular',
                          color: '#000',
                        }}
                      >
                        {produto.product.name}
                      </strong>
                    </td>
                    <td>
                      <strong
                        style={{
                          fontFamily: 'glyphicons-halflings-regular',
                          color: '#000',
                        }}
                      >
                        {formatPrice(produto.price)}
                      </strong>
                    </td>
                  </tr>
                </tbody>
              ))}
            </ProductTable>

            <header>
              <div
                style={{
                  fontFamily: 'glyphicons-halflings-regular',
                  color: '#000',
                }}
              >
                Enviar p/ troco:
                <span
                  style={{
                    fontFamily: 'glyphicons-halflings-regular',
                    color: '#000',
                  }}
                >
                  {orderData ? formatPrice(order.subtotal) : loading}
                </span>
              </div>
              <div
                style={{
                  fontFamily: 'glyphicons-halflings-regular',
                  color: '#000',
                }}
              >
                Subtotal:
                <span
                  style={{
                    fontFamily: 'glyphicons-halflings-regular',
                    color: '#000',
                  }}
                >
                  {orderData ? formatPrice(order.subtotal) : loading}
                </span>
              </div>

              <div
                style={{
                  fontFamily: 'glyphicons-halflings-regular',
                  color: '#000',
                }}
              >
                Taxa de entrega:
                <span
                  style={{
                    fontFamily: 'glyphicons-halflings-regular',
                    color: '#000',
                  }}
                >
                  {orderData ? formatPrice(order.delivery_fee) : loading}
                </span>
              </div>

              <div
                style={{
                  fontSize: 21,
                  color: '#000',
                  fontFamily: 'glyphicons-halflings-regular',
                }}
              >
                Total:
                <span
                  style={{
                    fontSize: 21,
                    color: '#000',
                    fontFamily: 'glyphicons-halflings-regular',
                  }}
                >
                  {orderData ? formatPrice(order.total) : loading}
                </span>
              </div>
              <div>
                <Link to="/pedidos">
                  <Button
                    variant="contained"
                    startIcon={<LocalPrintshopIcon />}
                  >
                    Imprimir
                  </Button>
                </Link>
              </div>
            </header>
            <header>
              <div
                style={{
                  fontFamily: 'glyphicons-halflings-regular',
                  color: '#000',
                }}
              >
                Obs:
                <span
                  style={{
                    fontFamily: 'glyphicons-halflings-regular',
                    color: '#000',
                  }}
                >
                  Trazer muita maiones por favor da proxima na veio maiones
                  traga viu
                </span>
              </div>
            </header>
          </Containerr>
        ))}
      </div>
    </div>
  );
}

Order.propTypes = {
  location: PropTypes.shape().isRequired,
};
