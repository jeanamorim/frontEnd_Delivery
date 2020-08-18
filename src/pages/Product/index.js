/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable func-names */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Icon, Button } from 'semantic-ui-react';
import {
  MdSearch,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from 'react-icons/md';

import {
  openEditProduct,
  GetProductRequest,
} from '../../store/modules/product/actions';

import { history } from '../../services/history';
import { formatPrice } from '../../util/format';
import Product from '../../Modals/NewProduct';
import Category from '../../Modals/NewCategoria';

import ProductEdit from '../../Modals/EditProduct';
import {
  Container,
  Title,
  PageActions,
  PageContent,
  Pagination,
} from './styles';

export default function Products({ location }) {
  const product = useSelector(state => state.product.ProductCategoria);
  const { state } = location;
  const params = new URLSearchParams(useLocation().search);
  const dispatch = useDispatch();
  const id = params.get('id');
  useEffect(() => {
    dispatch(GetProductRequest(id));
  }, []);

  function handleEditProduct(product) {
    const produto = {
      ...product,
      category_id: product.category.id,
    };
    dispatch(openEditProduct(produto));
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
                    <Button type="button" variant="contained">
                      <Icon name="arrow circle left" /> Voltar
                    </Button>
                  </div>

                  <div className="panel-body">
                    <Container>
                      <Title>
                        <img src={state.categoria.image.url} alt="" />
                        <strong>Gerenciando produtos</strong>
                        <div>{state.categoria.name}</div>
                      </Title>

                      <PageActions>
                        <div>
                          <i>
                            <MdSearch size={20} />
                          </i>

                          <input type="text" placeholder="Buscar por produto" />
                        </div>
                        <div style={{ display: 'flex' }}>
                          <Product />
                          <Category />
                        </div>
                      </PageActions>

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
                          {product.map(delivery => (
                            <>
                              <tr
                                key={delivery.id}
                                onClick={() => handleEditProduct(delivery)}
                              >
                                <td>
                                  <main>
                                    <img src={delivery.image.url} alt="" />
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
                        <ProductEdit idCat={id} />
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
