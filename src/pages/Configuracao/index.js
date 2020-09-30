/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import { Container, Name } from './styles';
import 'react-datepicker/dist/react-datepicker.css';
import Imagem from './Image';

export default function Configuracao() {
  const profile = useSelector(state => state.user.profile);

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
                      <Container>
                        <div>
                          <div style={{ float: 'right' }}>
                            <text style={{ fontSize: 18, fontWeight: 'bold' }}>
                              Info de exibição
                            </text>
                            <div
                              style={{
                                dispaly: 'flex',
                                height: 130,
                                borderRadius: 2,

                                marginTop: 20,
                              }}
                            >
                              <text style={{}}>
                                Você não poderá alterar os dados por aqui.
                              </text>
                            </div>
                          </div>
                        </div>
                        <div>
                          <Imagem />
                        </div>
                        <div>
                          <div style={{ marginTop: 20 }}>
                            <text style={{ fontSize: 18, fontWeight: 'bold' }}>
                              Seu status:
                            </text>
                            <text
                              style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                marginLeft: 5,
                                color: 'green',
                              }}
                            >
                              {profile.status}
                            </text>
                          </div>
                          <div style={{ marginTop: 20 }}>
                            <text style={{ fontSize: 18, fontWeight: 'bold' }}>
                              Seu e-mail:
                            </text>
                            <text
                              style={{
                                color: '#FC7B11',
                                fontSize: 20,
                                fontWeight: 'bold',
                                marginLeft: 5,
                              }}
                            >
                              {profile.email}
                            </text>
                          </div>
                          <div style={{ marginTop: 20 }}>
                            <text style={{ fontSize: 18, fontWeight: 'bold' }}>
                              Tempo de entrega:
                            </text>
                            <text
                              style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                marginLeft: 5,
                                color: '#FC7B11',
                              }}
                            >
                              {profile.tempo_entrega} min
                            </text>
                          </div>
                        </div>
                      </Container>

                      <text
                        style={{
                          fontSize: 16,
                          fontWeight: 'bold',
                        }}
                      >
                        Nome de seu estabelecimento *
                      </text>
                      <Name>
                        <div style={{ marginTop: 15, marginLeft: 20 }}>
                          <text style={{ fontSize: 22 }}>
                            {profile.name_loja}
                          </text>
                        </div>
                      </Name>
                      <div style={{ marginTop: 15, marginLeft: 10 }}>
                        <text style={{ fontSize: 14 }}>
                          Caso desejar alterar o nome do estabelecimento, entre
                          em contato com o nosso suporte.
                        </text>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <text style={{ fontSize: 22, color: '#FC7B11', fontWeight: 'bold' }}>
            Suporte
          </text>
          <text style={{ fontSize: 15, marginTop: 5 }}>2020 Meu Delivery</text>
          <text style={{ fontSize: 15, marginTop: 5 }}>
            JEAN SOLUCOES E SERVICOS DE SOFTWARE LTDA
          </text>
        </div>
      </div>
    </div>
  );
}
