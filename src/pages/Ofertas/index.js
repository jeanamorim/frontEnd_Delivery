/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-alert */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { format, parseISO, isAfter } from 'date-fns';

import { Icon, Button } from 'semantic-ui-react';
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdSearch,
} from 'react-icons/md';

import { formatPrice } from '../../util/format';
import Oferta from '../../Modals/NewOferta';
import { dateLanguage } from '../../locales';
import {
  GetOfertasRequest,
  deletOfertasRequest,
} from '../../store/modules/ofertas/actions';
import { Container, PageContent, Pagination, PageActions } from './styles';

export default function Offers() {
  const ofertas = useSelector(state => state.ofertas.Ofertas);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetOfertasRequest());
  }, []);
  function handleDeleteOferta(id) {
    dispatch(deletOfertasRequest(id));
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
                      <PageActions>
                        <div>
                          <i>
                            <MdSearch size={20} />
                          </i>

                          <input type="text" placeholder="Buscar por produto" />
                        </div>

                        <Oferta />
                      </PageActions>
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
                                <td>{formatPrice(delivery.product.price)}</td>
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
                                  {' '}
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
                                    onClick={() => {
                                      if (
                                        window.confirm(
                                          `Tem certeza que deseja encerrar esta oferta ?`,
                                        )
                                      )
                                        handleDeleteOferta(delivery.id);
                                    }}
                                  />
                                </td>
                              </tr>
                              <br />
                            </>
                          ))}
                        </tbody>
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
