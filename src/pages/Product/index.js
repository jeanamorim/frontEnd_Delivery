/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable func-names */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Icon, Button, Divider } from 'semantic-ui-react';
import {
  MdSearch,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from 'react-icons/md';
import { toast } from 'react-toastify';
import {
  openEditProduct,
  GetProductRequest,
} from '../../store/modules/product/actions';
import api from '../../services/api';
import { history } from '../../services/history';
import { formatPrice } from '../../util/format';
import Product from '../../Modals/NewProduct';
import Category from '../../Modals/NewCategoria';

import ProductEdit from '../../Modals/EditProduct';
import EditCategoria from '../../Modals/EditCategoria';
import {
  Container,
  Title,
  PageActions,
  PageContent,
  Pagination,
} from './styles';
import { editeCategoriaOpen } from '../../store/modules/categorias/actions';
import Animation from '../../components/Animation';
import * as loadingData from '../../assets/animations/loading.json';

export default function Products({ location }) {
  const openModal = useSelector(state => state.product.editProduct);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const { state } = location;
  const params = new URLSearchParams(useLocation().search);
  const dispatch = useDispatch();
  const id = params.get('id');

  useEffect(() => {
    async function loadOrder() {
      setLoading(true);
      try {
        const response = await api.get(`products/${id}`);

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
  }
  function handleEditCategoria() {
    dispatch(editeCategoriaOpen(state.categoria));
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
                      <Icon
                        style={{ marginTop: -10, marginLeft: 5 }}
                        name="pencil alternate"
                        color="orange"
                        size="large"
                        onClick={() => handleEditCategoria()}
                      />
                    </Title>
                    <EditCategoria />
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
                                      <td>{formatPrice(delivery.price)}</td>
                                      <td style={{ color: '#1C1CCE' }}>
                                        {delivery.variacao.length} (variações)
                                      </td>

                                      <td>Ativo</td>
                                    </tr>
                                    <br />
                                  </>
                                ))}
                              </tbody>
                              {openModal === true ? (
                                <ProductEdit idCat={id} />
                              ) : null}
                            </PageContent>

                            <Pagination>
                              <button type="button">
                                <MdKeyboardArrowLeft
                                  size={20}
                                  color="#7d40e7"
                                />
                              </button>

                              <span>Página 1</span>

                              <button type="button">
                                <MdKeyboardArrowRight
                                  size={20}
                                  color="#7d40e7"
                                />
                              </button>
                            </Pagination>
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
