/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import translate from '../../locales';
import Animation from '../../components/Animation';
import * as loadingData from '../../assets/animations/loading.json';
import { formatPrice } from '../../util/format';
import api from '../../services/api';

export default function Dashboard() {
  const [status, setStatus] = useState();
  const [faturamento, setFaturamento] = useState([]);
  /*
  useEffect(() => {
    async function loadStatus() {
      try {
        const response = await axios
          .all([api.get('/products'), api.get('/orders'), api.get('/offers')])
          .then(
            axios.spread((products, orders, offers) => ({
              products: products.data.length,
              orders: orders.data.length,
              offers: offers.data.length,
            })),
          );

        setStatus(response);
      } catch (err) {
        toast.error(translate('server_connection_error'));
      }
    }
    loadStatus();
  }, []);
  */
  useEffect(() => {
    async function loadPedidos() {
      try {
        const response = await api.get('faturamentoTotal');
        setFaturamento(response.data[0].subtotal);
      } catch (err) {
        toast.error('Falha ao conectar com o servidor');
      }
    }
    loadPedidos();
  }, []);

  const loading = <Animation width={40} height={40} animation={loadingData} />;

  return (
    <div className="content-wrapper" style={{ marginTop: 50 }}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-12">
                <div className="panel panel-default">
                  <div className="panel-heading">Home</div>
                  <div className="col-md-3" style={{ marginTop: 40 }}>
                    <div className="panel panel-default">
                      <div
                        className="panel-body text-light"
                        style={{ background: 'red' }}
                      >
                        <div className="stat-panel text-center">
                          <div className="stat-panel-number h1 ">
                            {status ? status.orders : loading}
                          </div>
                          <div className="stat-panel-title text-uppercase">
                            Pedidos
                          </div>
                        </div>
                      </div>
                      <Link
                        to="/orders"
                        className="block-anchor panel-footer text-center"
                      >
                        Detalhes
                        <i className="fa fa-arrow-right" />
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-3" style={{ marginTop: 40 }}>
                    <div className="panel panel-default">
                      <div className="panel-body bk-success text-light">
                        <div className="stat-panel text-center">
                          <div className="stat-panel-number h1 ">
                            {status ? status.products : loading}
                          </div>
                          <div className="stat-panel-title text-uppercase">
                            Produtos
                          </div>
                        </div>
                      </div>
                      <Link
                        to="/categoria"
                        className="block-anchor panel-footer text-center"
                      >
                        Detalhes
                        <i className="fa fa-arrow-right" />
                      </Link>
                    </div>
                  </div>

                  <div className="col-md-3" style={{ marginTop: 40 }}>
                    <div className="panel panel-default">
                      <div className="panel-body bk-warning text-light">
                        <div className="stat-panel text-center">
                          <div className="stat-panel-number h1 ">
                            {status ? status.offers : loading}
                          </div>
                          <div className="stat-panel-title text-uppercase">
                            Ofertas
                          </div>
                        </div>
                      </div>
                      <Link
                        to="/oferta"
                        className="block-anchor panel-footer text-center"
                      >
                        Detalhes
                        <i className="fa fa-arrow-right" />
                      </Link>
                    </div>
                  </div>

                  <div className="col-md-3" style={{ marginTop: 40 }}>
                    <div className="panel panel-default">
                      <div className="panel-body bk-warning text-light">
                        <div className="stat-panel text-center">
                          <div className="stat-panel-number h2 ">
                            {formatPrice(faturamento || loading)}
                          </div>
                          <div className="stat-panel-title text-uppercase">
                            Faturamento
                          </div>
                        </div>
                      </div>
                      <Link
                        to="/analise"
                        className="block-anchor panel-footer text-center"
                      >
                        Detalhes
                        <i className="fa fa-arrow-right" />
                      </Link>
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
