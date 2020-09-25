/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import {
  Input,
  Button,
  Divider,
  Icon,
  Dropdown,
  Menu,
} from 'semantic-ui-react';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import Animation from '../../../components/Animation';
import * as loadingData from '../../../assets/animations/loading.json';
import { Container, Time, Header, ContainerText, Text } from './styles';

export default function FormPagamento() {
  const [valores, selValores] = useState([]);
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
                        {/* <ContainerText>
                          <Text>
                            Ao editar uma zona de entrega em seguida clique em -
                            SALVAR - se voçê for editar outra zona sem salvar a
                            anterior, o valor da anterior será perdido.
                          </Text>
                        </ContainerText> */}
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
                                          style={{ marginLeft: 50 }}
                                        >
                                          loading
                                        </Button>
                                      ) : (
                                        <Button
                                          positive
                                          style={{ marginLeft: 50 }}
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
                                      }}
                                    >
                                      Salvar
                                    </Button>
                                  )}
                                </div>
                                <div
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                  }}
                                >
                                  <span>Entrega {item.status}</span>
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
