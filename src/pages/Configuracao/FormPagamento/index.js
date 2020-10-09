/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';

import { Divider, Button, Icon } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import {
  Container,
  Time,
  ContainerAceito,
  Header,
  Pagination,
  ContainerTable,
  PageContent,
  InfoHeader,
  InfoText,
} from './styles';
import Animation from '../../../components/Animation';
import * as loadingData from '../../../assets/animations/loading.json';

export default function FormPagamento() {
  const [pagamentoTrue, setPagamentoTrue] = useState([]);
  const [pagamentoFalse, setPagamentoFalse] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadCategories() {
      setLoading(true);
      try {
        const response = await api.get('/pagamento');
        const pagamentoAceito = response.data.filter(
          item => item.status === true,
        );
        const pagamentoFalses = response.data.filter(
          item => item.status === false,
        );

        setPagamentoTrue(pagamentoAceito);
        setPagamentoFalse(pagamentoFalses);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  async function updatePaymentFalse(id) {
    try {
      await api.put(`pagamento/${id}`, {
        status: false,
      });
      const response = await api.get('/pagamento');
      const pagamentoAceito = response.data.filter(
        item => item.status === true,
      );
      const pagamentoFalses = response.data.filter(
        item => item.status === false,
      );

      setPagamentoTrue(pagamentoAceito);
      setPagamentoFalse(pagamentoFalses);

      toast.success('Cartão excluido com sucesso');
    } catch (err) {
      if (err.response) {
        toast.error('Erro no servidor');
      } else {
        toast.error('Erro ao conectar com o servidor');
      }
    }
  }
  async function updatePaymentTrue(id) {
    try {
      await api.put(`pagamento/${id}`, {
        status: true,
      });
      const response = await api.get('/pagamento');
      const pagamentoAceito = response.data.filter(
        item => item.status === true,
      );
      const pagamentoFalses = response.data.filter(
        item => item.status === false,
      );

      setPagamentoTrue(pagamentoAceito);
      setPagamentoFalse(pagamentoFalses);

      toast.success('Cartão Adicionado com sucesso');
    } catch (err) {
      if (err.response) {
        toast.error('Erro no servidor');
      } else {
        toast.error('Erro ao conectar com o servidor');
      }
    }
  }
  function refreshPage() {
    window.location.reload();
  }

  const loadingAnimation = (
    <Animation width={50} height={50} animation={loadingData} />
  );

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
                      <Header>
                        <div>Forma de pagamento</div>
                      </Header>
                      <Divider />
                      {loading ? (
                        <div>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexDirection: 'column',
                            }}
                          >
                            Carregando...
                          </div>
                          {loadingAnimation}
                        </div>
                      ) : (
                        <div>
                          <Container>
                            <InfoHeader>
                              <InfoText>Cartões não aceito</InfoText>
                            </InfoHeader>
                            <ul>
                              {pagamentoFalse.map(item => (
                                <Time>
                                  <strong>{item.name}</strong>

                                  <img src={item.image.url} />
                                  <Button
                                    positive
                                    style={{ margin: 5 }}
                                    onClick={() => updatePaymentTrue(item.id)}
                                  >
                                    Aceitar
                                  </Button>
                                </Time>
                              ))}
                            </ul>
                          </Container>

                          <ContainerAceito>
                            <InfoHeader>
                              <InfoText>Cartões aceitos</InfoText>
                            </InfoHeader>
                            <ul>
                              {pagamentoTrue.map(item => (
                                <Time>
                                  <strong>{item.name}</strong>

                                  <img src={item.image.url} />
                                  <Button
                                    negative
                                    style={{ margin: 5 }}
                                    onClick={() => updatePaymentFalse(item.id)}
                                  >
                                    Excluir
                                  </Button>
                                </Time>
                              ))}
                            </ul>
                          </ContainerAceito>
                        </div>
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
