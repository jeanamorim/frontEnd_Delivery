/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { Advertisement, Divider, Button, Icon } from 'semantic-ui-react';
import { MdSearch } from 'react-icons/md';
import socketio from 'socket.io-client';
import { editeCategoriaOpen } from '../../store/modules/categorias/actions';
import { Container, PageActions, Title } from './styles';
import Product from '../../Modals/NewProduct';
import Category from '../../Modals/NewCategoria';
import EditCategoria from '../../Modals/EditCategoria';
import Animation from '../../components/Animation';
import * as loadingData from '../../assets/animations/loading.json';
import api from '../../services/api';

export default function Categoria() {
  const dispatch = useDispatch();
  const [categorias, setCategorias] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const profile_id = useSelector(state => state.user.profile.id);
  const loadingAnimation = (
    <Animation width={50} height={50} animation={loadingData} />
  );

  const socket = useMemo(
    () =>
      socketio('https://backend-delivery.herokuapp.com', {
        query: { profile_id },
      }),
    [profile_id],
  );

  async function loadCategories() {
    setLoading(true);
    try {
      const response = await api.get('/categories');

      setCategorias(response.data);
      setLoading(false);
    } catch (err) {
      if (err.response) {
        toast.error('Erro no servidor');
      } else {
        toast.error('Erro ao conectar com o servidor');
      }
    }
  }
  useEffect(() => {
    socket.on('NEW_CATEGORIAS', data => {
      const newCategories = categorias.concat(data);
      setCategorias(newCategories);
    });
  }, [categorias, socket]);
  useEffect(() => {
    socket.on('UPDATE_CATEGORIAS', data => {
      loadCategories();
    });
  }, [categorias, socket]);

  useEffect(() => {
    loadCategories();
  }, []);

  function handleEditCategoria(categoria) {
    dispatch(editeCategoriaOpen(categoria));
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
                      {/* {categorias.length > 0 ? ( */}
                      {loading ? (
                        <Container>
                          <Divider />
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexDirection: 'column',
                            }}
                          >
                            Carregando categorias
                          </div>
                          {loadingAnimation}
                        </Container>
                      ) : (
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

                          <EditCategoria open={open} setOpen={setOpen} />
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
