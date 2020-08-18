/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Advertisement } from 'semantic-ui-react';
import { getCategoriasRequest } from '../../store/modules/categorias/actions';
import { Container } from './styles';
import Product from '../../Modals/NewProduct';
import Category from '../../Modals/NewCategoria';

export default function Categoria() {
  const dispatch = useDispatch();
  const categorias = useSelector(state => state.categorias.Categorias);

  useEffect(() => {
    dispatch(getCategoriasRequest());
  }, []);

  return (
    <div className="content-wrapper" style={{ marginTop: 40 }}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-12">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <Product />
                    <Category />
                  </div>

                  <div className="content-wrapper">
                    <div className="panel-body">
                      <Container>
                        <ul>
                          {categorias.map(categoria => (
                            <li key={categoria.id}>
                              <Link
                                to={{
                                  pathname: '/produto',
                                  search: `?id=${categoria.id}`,
                                  state: {
                                    categoria,
                                  },
                                }}
                              >
                                <Advertisement
                                  unit="small rectangle"
                                  test={categoria.name}
                                  title={categoria.name}
                                >
                                  <img
                                    src={categoria.image.url}
                                    style={{ opacity: 0.2 }}
                                    title={categoria.name}
                                  />
                                </Advertisement>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </Container>
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
