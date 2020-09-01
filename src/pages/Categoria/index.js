/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Advertisement, Divider, Button, Icon } from 'semantic-ui-react';
import { MdSearch } from 'react-icons/md';
import {
  getCategoriasRequest,
  editeCategoriaOpen,
} from '../../store/modules/categorias/actions';
import { Container, PageActions, Title } from './styles';
import Product from '../../Modals/NewProduct';
import Category from '../../Modals/NewCategoria';
import EditCategoria from '../../Modals/EditCategoria';

export default function Categoria() {
  const dispatch = useDispatch();
  const categorias = useSelector(state => state.categorias.Categorias);

  useEffect(() => {
    dispatch(getCategoriasRequest());
  }, []);

  function handleEditCategoria(categoria) {
    dispatch(editeCategoriaOpen(categoria));
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
                    <Button onClick={refreshPage}>
                      <Icon name="sync" /> Atualizar
                    </Button>
                  </div>

                  <div className="content-wrapper">
                    <div className="panel-body">
                      <Title>
                        <strong>Categorias dos produtos</strong>
                      </Title>
                      <PageActions>
                        <div>
                          <i>
                            <MdSearch size={20} />
                          </i>

                          <input
                            type="text"
                            placeholder="Buscar por categoria"
                          />
                        </div>
                        <div style={{ display: 'flex' }}>
                          <Product />
                          <Category />
                        </div>
                      </PageActions>
                      {categorias.length > 0 ? (
                        <Container>
                          <Divider />
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
                                <Button
                                  icon="edit outline"
                                  title="Editar"
                                  size="mini"
                                  onClick={() => handleEditCategoria(categoria)}
                                  style={{
                                    position: 'absolute',
                                    marginTop: -31,
                                    borderRadius: 0,
                                    backgroundColor: '#999',
                                    color: '#fff',

                                    marginLeft: 3,
                                  }}
                                />
                              </li>
                            ))}
                          </ul>
                          <EditCategoria />
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
                          <div>Nenhum categoria cadastrada...</div>
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
    </div>
  );
}
