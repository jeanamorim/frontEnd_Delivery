/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import {
  Input,
  Button,
  Divider,
  Icon,
  Dropdown,
  Checkbox,
  Select,
  Form,
} from 'semantic-ui-react';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import Animation from '../../../components/Animation';
import * as loadingData from '../../../assets/animations/loading.json';
import { Container, Time, Header, ContainerText, Text } from './styles';

export default function FormPagamento() {
  const [valores, selValores] = useState([]);
  const [loadingstatus, setLoadingStatus] = useState(false);

  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [novoValor, setNovoValor] = useState([]);
  const [render, setRender] = useState(0);

  useEffect(() => {
    async function loadCategories() {
      setLoading(true);
      try {
        const response = await api.get('/frete');

        selValores(response.data);
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
  }, [render]);
  async function updateZona(id) {
    setLoadingButton(true);
    try {
      await api.put(`frete/${id}`, {
        price: novoValor.price,
      });

      const response = await api.get('/frete');
      selValores(response.data);

      toast.success('Area de entrega atualizada com sucesso');
      setNovoValor('');
      setLoadingButton(false);
    } catch (err) {
      if (err.response) {
        toast.error('Erro no servidor');
      } else {
        toast.error('Erro ao conectar com o servidor');
      }
    }
  }

  function setFreteItemValue(position, field, value) {
    const updateFreteItems = valores.map((valor, index) => {
      if (index === position) {
        setNovoValor({ ...valor, [field]: value });
        return { ...valor, [field]: value };
      }

      return valor;
    });

    selValores(updateFreteItems);
  }

  function refreshPage() {
    window.location.reload();
  }

  const loadingAnimation = (
    <Animation width={50} height={50} animation={loadingData} />
  );
  async function onChangeActive(item) {
    try {
      setLoadingStatus(true);
      await api.put(`frete/${item.id}`, {
        status: 'INATIVA',
      });
      const response = await api.get('/frete');
      selValores(response.data);
      setLoadingStatus(false);
    } catch (err) {
      if (err.response) {
        toast.error('Erro no servidor');
      } else {
        toast.error('Erro ao conectar com o servidor');
      }
    }
  }
  async function onChangeInactive(item) {
    try {
      await api.put(`frete/${item.id}`, {
        status: 'ATIVA',
      });
      const response = await api.get('/frete');
      selValores(response.data);
    } catch (err) {
      if (err.response) {
        toast.error('Erro no servidor');
      } else {
        toast.error('Erro ao conectar com o servidor');
      }
    }
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
                      <Container>
                        <Header>
                          <div> Valores das Entregas</div>
                        </Header>
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
                              Carregando...
                            </div>
                            {loadingAnimation}
                          </Container>
                        ) : (
                          <ul>
                            {valores.map((item, index) => (
                              <Time key={item.id}>
                                <strong>{item.name}</strong>
                                <div
                                  style={{
                                    display: 'flex',
                                  }}
                                >
                                  <Input
                                    label="R$"
                                    placeholder="valor"
                                    value={item.price}
                                    style={{ width: 120 }}
                                    onChange={e =>
                                      setFreteItemValue(
                                        index,
                                        'price',
                                        e.target.value,
                                      )
                                    }
                                  />
                                  {novoValor.id === item.id ? (
                                    <div>
                                      {loadingButton ? (
                                        <Button
                                          loading
                                          positive
                                          style={{ marginLeft: 50, width: 90 }}
                                        >
                                          loading
                                        </Button>
                                      ) : (
                                        <Button
                                          positive
                                          style={{ marginLeft: 50, width: 90 }}
                                          onClick={() => updateZona(item.id)}
                                        >
                                          Salvar
                                        </Button>
                                      )}
                                    </div>
                                  ) : (
                                    <Button
                                      style={{
                                        marginLeft: 50,
                                        backgroundColor: '#9999',
                                        width: 90,
                                      }}
                                    >
                                      Salvar
                                    </Button>
                                  )}
                                </div>

                                <div
                                  style={{
                                    marginTop: 10,
                                  }}
                                >
                                  <div>
                                    {item.status === 'ATIVA' ? (
                                      <Button
                                        onClick={() => onChangeActive(item)}
                                        style={{
                                          backgroundColor: '#509A45',
                                          color: '#fff',
                                          opacity: 1,
                                          width: 100,
                                        }}
                                      >
                                        {item.status}
                                      </Button>
                                    ) : (
                                      <Button
                                        onClick={() => onChangeInactive(item)}
                                        style={{
                                          backgroundColor: '#509A45',
                                          color: '#fff',
                                          opacity: 0.2,
                                          width: 100,
                                        }}
                                      >
                                        {item.status}
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </Time>
                            ))}
                          </ul>
                        )}
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
