/* eslint-disable no-use-before-define */
/* eslint-disable radix */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable func-names */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState, useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Icon, Button, Divider } from 'semantic-ui-react';
import { MdSearch } from 'react-icons/md';
import { toast } from 'react-toastify';
import socketio from 'socket.io-client';
import { openEditProduct } from '../../store/modules/product/actions';
import api from '../../services/api';
import { history } from '../../services/history';
import { formatPrice } from '../../util/format';
import Product from '../../Modals/NewProduct';
import Category from '../../Modals/NewCategoria';
import ProductEdit from '../../Modals/EditProduct/Produto';

import { Container, Title, PageActions, PageContent } from './styles';
import { getCategoriasRequest } from '../../store/modules/categorias/actions';
import Animation from '../../components/Animation';
import * as loadingData from '../../assets/animations/loading.json';

export default function Products({ location }) {
  const [open, setOpen] = React.useState(false);
  const [products, setProducts] = useState([]);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const { state } = location;
  const params = new URLSearchParams(useLocation().search);
  const dispatch = useDispatch();
  const id = params.get('id');
  const idInt = parseInt(id);
  const profile_id = useSelector(state => state.user.profile.id);

  const socket = useMemo(
    () =>
      socketio('https://backend-delivery.herokuapp.com', {
        query: { profile_id },
      }),
    [profile_id],
  );
  useEffect(() => {
    socket.on('NEW_PRODUCT', data => {
      const verificar = data[0].category.id === idInt;
      if (verificar) {
        const naewProduts = products.concat(data);
        setProducts(naewProduts);
      }
    });
  }, [products, socket]);
  useEffect(() => {
    socket.on('UPDATE_PRODUCT', data => {
      loadOrder();
    });
  }, [products, socket]);

  async function loadOrder() {
    setLoading(true);
    try {
      const response = await api.get(`products/${id}`);
      dispatch(getCategoriasRequest());
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      if (err.response) {
        toast.error('Erro no servidor');
      } else {
        toast.error('Falha ao conectar com o servidor');
      }
    }
  }

  useEffect(() => {
    loadOrder();
  }, [state]);

  const loadingAnimation = (
    <Animation width={50} height={50} animation={loadingData} />
  );

  function handleEditProduct(product) {
    const produto = {
      ...product,
      category_id: product.category.id,
    };
    dispatch(openEditProduct(produto));
    setOpen(true);
  }

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
                      <img src={state.categoria.image.url} alt="" />

                      <strong style={{ textTransform: 'uppercase' }}>
                        {state.categoria.name}
                      </strong>
                    </Title>

                    <PageActions>
                      <div>
                        <i>
                          <MdSearch size={20} />
                        </i>

                        <input
                          type="text"
                          placeholder="Buscar por produto"
                          onChange={e => setName(e.target.value)}
                        />
                      </div>
                      <div style={{ display: 'flex' }}>
                        <Product />
                        <Category />
                      </div>
                    </PageActions>
                    <Divider />
                    {loading ? (
                      <Container>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                          }}
                        >
                          Carregando produtos..
                        </div>
                        {loadingAnimation}
                      </Container>
                    ) : (
                      <Container>
                        {products.length > 0 ? (
                          <>
                            <PageContent>
                              <thead>
                                <tr>
                                  <th />
                                  <th>NOME DO PRODUTO</th>
                                  <th>PREÇO</th>
                                  <th> QTD. VARIAÇÕES</th>

                                  <th>STATUS</th>
                                </tr>
                              </thead>
                              <tbody>
                                {products.map(delivery => (
                                  <>
                                    <tr
                                      key={delivery.id}
                                      onClick={() =>
                                        handleEditProduct(delivery)
                                      }
                                    >
                                      <td>
                                        <main>
                                          <img
                                            src={delivery.image.url}
                                            alt=""
                                          />
                                        </main>
                                      </td>
                                      <td>{delivery.name}</td>
                                      <td> R$ {formatPrice(delivery.price)}</td>
                                      <td style={{ color: '#1C1CCE' }}>
                                        {delivery.variacao.length} (variações)
                                      </td>

                                      <td>Ativo</td>
                                    </tr>
                                    <br />
                                  </>
                                ))}
                              </tbody>
                              {open === true ? (
                                <ProductEdit open={open} setOpen={setOpen} />
                              ) : null}
                            </PageContent>
                          </>
                        ) : (
                          <Container
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexDirection: 'column',
                            }}
                          >
                            <div>Nenhum produto cadastrada...</div>
                          </Container>
                        )}
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
  );
}
Products.propTypes = {
  location: PropTypes.shape().isRequired,
};
