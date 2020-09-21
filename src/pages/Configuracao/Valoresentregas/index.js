/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import { Input, Button, Divider, Icon } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import Animation from '../../../components/Animation';
import * as loadingData from '../../../assets/animations/loading.json';
import { Container, Time, Header } from './styles';

export default function FormPagamento() {
  const [valores, selValores] = useState([]);
  const [loading, setLoading] = useState(false);

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
  }, []);
  async function handleCreateClass(e) {
    e.preventDefault();

    try {
      const response = await api.put('/frete', {
        frete: valores,
      });

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

  function setFreteItemValue(position, field, value) {
    const updateFreteItems = valores.map((valor, index) => {
      if (index === position) {
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
                                <Input
                                  label="R$"
                                  placeholder="valor"
                                  value={item.price}
                                  onChange={e =>
                                    setFreteItemValue(
                                      index,
                                      'price',
                                      e.target.value,
                                    )
                                  }
                                />
                                <span>Entrega {item.status}</span>
                              </Time>
                            ))}
                          </ul>
                        )}

                        <div style={{ marginTop: 50, display: 'flex' }}>
                          <Button negative style={{ width: 100 }}>
                            Cancelar
                          </Button>
                          <Button
                            positive
                            style={{ width: 100 }}
                            onClick={handleCreateClass}
                          >
                            Salvar
                          </Button>
                        </div>
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
