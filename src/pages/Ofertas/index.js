/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { format, parseISO, isAfter } from 'date-fns';
import { Modal, Button, Icon, Header, Divider } from 'semantic-ui-react';
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdSearch,
} from 'react-icons/md';
import { toast } from 'react-toastify';
import Animation from '../../components/Animation';
import * as loadingData from '../../assets/animations/loading.json';

import { formatPrice } from '../../util/format';
import Oferta from '../../Modals/NewOferta';
import { dateLanguage } from '../../locales';
import {
  GetOfertasRequest,
  deletOfertasRequest,
} from '../../store/modules/ofertas/actions';
import {
  Container,
  PageContent,
  Pagination,
  PageActions,
  Title,
} from './styles';
import api from '../../services/api';

export default function Offers() {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ofertas, setOfertas] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadCategories() {
      setLoading(true);
      try {
        const response = await api.get('/offers');

        setOfertas(response.data);
        setLoading(false);
      } catch (err) {
        if (err.response) {
          toast.error('Erro no servidor');
        } else {
          toast.error('Erro ao conectar com o servidor');
        }
      }
    }

    loadCategories();
  }, []);

  const loadingAnimation = (
    <Animation width={50} height={50} animation={loadingData} />
  );

  useEffect(() => {
    dispatch(GetOfertasRequest());
  }, []);
  function handleDeleteOferta(id) {
    dispatch(deletOfertasRequest(id));
    setOpenDeleteModal(false);
  }
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
                      <Button onClick={refreshPage}>
                        <Icon name="sync" /> Atualizar
                      </Button>
                    </div>

                    <div className="panel-body">
                      <Title>
                        <strong>Ofertas dos produtos</strong>
                      </Title>
                      <PageActions>
                        <div>
                          <i>
                            <MdSearch size={20} />
                          </i>

                          <input type="text" placeholder="Buscar por produto" />
                        </div>
                        <div style={{ display: 'flex' }}>
                          <Oferta />
                        </div>
                      </PageActions>
                      <Divider />

                      <div>
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
                              Carregando ofertas..
                            </div>
                            {loadingAnimation}
                          </Container>
                        ) : (
                          <Container>
                            <PageContent>
                              <thead>
                                <tr>
                                  <th />
                                  <th>NOME DO PRODUTO</th>
                                  <th>QUANTIDADE</th>
                                  <th> UNIDADE</th>
                                  <th>DE</th>
                                  <th>PARA</th>
                                  <th>STATUS</th>
                                  <th>EXPIRAÇÃO</th>
                                  <th>AÇÕES</th>
                                </tr>
                              </thead>
                              <tbody>
                                {ofertas.map(delivery => (
                                  <>
                                    <tr key={delivery.id}>
                                      <td>
                                        <main>
                                          <img
                                            src={delivery.product.image.url}
                                            alt=""
                                          />
                                        </main>
                                      </td>
                                      <td>{delivery.product.name}</td>
                                      <td>{delivery.quantity}</td>
                                      <td>{delivery.unit}</td>
                                      <td>
                                        {formatPrice(delivery.product.price)}
                                      </td>
                                      <td>{formatPrice(delivery.to)}</td>
                                      <td
                                        className={
                                          isAfter(
                                            parseISO(delivery.expiration_date),
                                            new Date(),
                                          )
                                            ? 'text-success'
                                            : 'text-danger'
                                        }
                                      >
                                        {isAfter(
                                          parseISO(delivery.expiration_date),
                                          new Date(),
                                        )
                                          ? 'ATIVO'
                                          : 'iNATIVO'}
                                      </td>

                                      <td>
                                        {format(
                                          parseISO(delivery.expiration_date),
                                          'PPPpp',
                                          {
                                            locale: dateLanguage,
                                          },
                                        )}
                                      </td>
                                      <td>
                                        <Icon
                                          title="Terminar ofertas"
                                          color="red"
                                          name="delete"
                                          size="large"
                                          onClick={() =>
                                            setOpenDeleteModal(true)
                                          }
                                        />
                                      </td>
                                    </tr>
                                    <br />
                                    <Modal
                                      closeIcon
                                      onClose={() => setOpenDeleteModal(false)}
                                      onOpen={() => setOpenDeleteModal(true)}
                                      open={openDeleteModal}
                                    >
                                      <Header
                                        icon="archive"
                                        content="Deletar produto"
                                      />
                                      <Modal.Content>
                                        <p>
                                          Voçê tem certeza que deseja remover a
                                          oferta do produto{' '}
                                          {delivery.product.name}?
                                        </p>
                                      </Modal.Content>
                                      <Modal.Actions>
                                        <Button
                                          color="red"
                                          onClick={() =>
                                            setOpenDeleteModal(false)
                                          }
                                        >
                                          <Icon name="remove" /> Não
                                        </Button>
                                        <Button
                                          color="green"
                                          onClick={() =>
                                            handleDeleteOferta(delivery.id)
                                          }
                                        >
                                          <Icon name="checkmark" /> Sim
                                        </Button>
                                      </Modal.Actions>
                                    </Modal>
                                  </>
                                ))}
                              </tbody>
                            </PageContent>
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
    </>
  );
}
