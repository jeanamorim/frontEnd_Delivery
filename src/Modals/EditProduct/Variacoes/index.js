/* eslint-disable no-alert */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Input, Form, Select } from '@rocketseat/unform';
import { Button, Divider, Icon, Modal, Header } from 'semantic-ui-react';

import { VariacaoList, Opcao, NovaOpcao } from './styles';

export default function Variacoes({
  variacao,
  setVariacaoItemValue,
  editVariacao,
  loadingEditVar,
  editarVariacao,
  setOpcaoItemValue,
  visibleOp,
  novaOpcao,
  novaOp,
  handleSubmitOpcao,
  exibirOpcao,
  deletarVariação,
  name,
  price,
  status,
  setName,
  setPrice,
  setStatus,
}) {
  return (
    <>
      <VariacaoList>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {variacao.map((item, index) => {
            const tipo = item.id;
            return (
              <>
                <div
                  style={{
                    display: 'flex',
                    marginBottom: 6,
                    padding: 20,
                    background: '#e6dfdf',
                  }}
                >
                  <div>
                    <label>
                      Nome <span style={{ color: 'red' }}>*</span>
                    </label>
                    <Input
                      name="name"
                      value={item.name}
                      type="text"
                      placeholder="NOME DA VARIAÇÃO"
                      onChange={e =>
                        setVariacaoItemValue(index, 'name', e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label>
                      Quant. Mínima
                      <span style={{ color: 'red' }}>*</span>
                    </label>
                    <Input
                      name="minimo"
                      value={item.minimo}
                      type="text"
                      placeholder="QUANT. MÍNIMA"
                      onChange={e =>
                        setVariacaoItemValue(index, 'minimo', e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label>
                      Quant. Máxima
                      <span style={{ color: 'red' }}>*</span>
                    </label>
                    <Input
                      name="maximo"
                      value={item.maximo}
                      type="text"
                      placeholder="QUANT. MÁXIMA"
                      onChange={e =>
                        setVariacaoItemValue(index, 'maximo', e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label>
                      Logica <span style={{ color: 'red' }}>*</span>
                    </label>
                    <Select
                      placeholder="LOGICA"
                      name="calculoPrice"
                      options={[
                        { id: 'MAIOR VALOR', title: 'MAIOR VALOR' },
                        { id: 'SOMA TOTAL', title: 'SOMA TOTAL' },
                      ]}
                    />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      marginLeft: 10,
                      height: 40,
                      marginTop: 18,
                    }}
                  >
                    {editVariacao.id === item.id ? (
                      <div>
                        {loadingEditVar ? (
                          <Button
                            positive
                            loading
                            style={{ width: 45, height: 40 }}
                          >
                            loading
                          </Button>
                        ) : (
                          <Button
                            style={{ width: 45, height: 40 }}
                            positive
                            icon="check"
                            onClick={() => editarVariacao(item.id)}
                          />
                        )}
                      </div>
                    ) : (
                      <Button
                        icon="check"
                        style={{
                          background: '#999',
                          color: '#fff',
                          width: 45,
                          height: 40,
                        }}
                      />
                    )}

                    <Button
                      negative
                      icon="times"
                      style={{ width: 45, height: 40 }}
                      onClick={() => {
                        if (
                          window.confirm(
                            `Tem certeza que deseja remover a variação ${item.name} ?`,
                          )
                        )
                          deletarVariação(item.id);
                      }}
                    />
                  </div>
                </div>

                {visibleOp ? (
                  <>
                    <div>
                      <Button
                        style={{
                          background: ' #fff',
                          borderColor: ' #fff',
                          borderRadius: 6,
                        }}
                        onClick={novaOpcao}
                      >
                        <text style={{ fontSize: 17, color: '#0B9F03' }}>
                          + Cadastrar nova opção
                        </text>
                      </Button>
                    </div>

                    {novaOp ? (
                      <NovaOpcao>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              marginBottom: 6,
                            }}
                          >
                            <div>
                              <label>
                                Nome <span style={{ color: 'red' }}>*</span>
                              </label>
                              <Input
                                name="name"
                                type="text"
                                placeholder="NOME DA OPÇÃO"
                                value={name}
                                onChange={e => setName(e.target.value)}
                              />
                            </div>
                            <div>
                              <label>
                                Preço
                                <span style={{ color: 'red' }}>*</span>
                              </label>
                              <Input
                                name="price"
                                type="text"
                                placeholder="PREÇO"
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                              />
                            </div>

                            <div>
                              <label>
                                Status <span style={{ color: 'red' }}>*</span>
                              </label>
                              <Select
                                placeholder="STATUS"
                                name="status"
                                options={[
                                  { id: 'ATIVO', title: 'ATIVO' },
                                  { id: 'INATIVO', title: 'INATIVO' },
                                ]}
                                value={status}
                                onChange={e => setStatus(e.target.value)}
                              />
                            </div>

                            <Button
                              positive
                              onClick={() =>
                                handleSubmitOpcao(name, price, status, item.id)
                              }
                              style={{
                                height: 39,
                                marginTop: 18,
                                marginLeft: 10,
                              }}
                            >
                              Salvar
                            </Button>
                          </div>
                        </div>
                      </NovaOpcao>
                    ) : null}

                    {item.opcao.map((item, index) => {
                      item.tipo = tipo;
                      return (
                        <Opcao>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexDirection: 'column',
                            }}
                          >
                            <div
                              style={{
                                display: 'flex',
                                marginBottom: 6,
                              }}
                            >
                              <div>
                                <label>
                                  Nome <span style={{ color: 'red' }}>*</span>
                                </label>
                                <Input
                                  name="name"
                                  value={item.name}
                                  type="text"
                                  placeholder="NOME DA VARIAÇÃO"
                                  onChange={e =>
                                    setOpcaoItemValue(
                                      index,
                                      'name',
                                      e.target.value,
                                    )
                                  }
                                />
                              </div>
                              <div>
                                <label>
                                  Preço
                                  <span style={{ color: 'red' }}>*</span>
                                </label>
                                <Input
                                  name="price"
                                  value={item.price}
                                  type="text"
                                  placeholder="PREÇO"
                                  onChange={e =>
                                    setOpcaoItemValue(
                                      index,
                                      'price',
                                      e.target.value,
                                    )
                                  }
                                />
                              </div>

                              <div>
                                <label>
                                  Status
                                  <span style={{ color: 'red' }}>*</span>
                                </label>
                                <Select
                                  placeholder="STATUS"
                                  name="status"
                                  value={item.status}
                                  onChange={e =>
                                    setOpcaoItemValue(
                                      index,
                                      'status',
                                      e.target.value,
                                    )
                                  }
                                  options={[
                                    { id: 'ATIVO', title: 'ATIVO' },
                                    { id: 'INATIVO', title: 'INATIVO' },
                                  ]}
                                />
                              </div>
                              <div
                                style={{
                                  display: 'flex',
                                  marginLeft: 10,
                                  height: 40,
                                  marginTop: 18,
                                }}
                              >
                                <Button
                                  icon="check"
                                  style={{
                                    background: '#999',
                                    color: '#fff',
                                  }}
                                />

                                <Button negative icon="times" />
                              </div>
                            </div>
                          </div>
                        </Opcao>
                      );
                    })}
                  </>
                ) : null}
                {visibleOp ? (
                  <Button
                    style={{
                      background: ' #fff',
                      borderColor: ' #fff',
                      borderRadius: 6,
                    }}
                    onClick={exibirOpcao}
                  >
                    <text style={{ fontSize: 17, color: '#0B9F03' }}>
                      Ocultar opções (0)
                    </text>
                  </Button>
                ) : (
                  <Button
                    style={{
                      background: ' #fff',
                      borderColor: ' #fff',
                      borderRadius: 6,
                    }}
                    onClick={exibirOpcao}
                  >
                    <text style={{ fontSize: 17, color: '#0B9F03' }}>
                      Mostrar opções (0)
                    </text>
                  </Button>
                )}

                <Divider />
              </>
            );
          })}
        </div>
      </VariacaoList>
    </>
  );
}
