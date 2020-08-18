/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import { Form, Input, Select } from '@rocketseat/unform';

import { toast } from 'react-toastify';

import translate from '../../../locales';
import Animation from '../../../components/Animation';
import * as loadingData from '../../../assets/animations/loading.json';

import api from '../../../services/api';

export default function Configuracao() {
  const [loading, setLoading] = useState(false);

  const [frete, setFrete] = useState([]);
  const [updatingStatus, setUpdatingStatus] = useState(0);
  const [value, setValue] = useState({});
  const [render, setRender] = useState(false);

  useEffect(() => {
    async function loadFrete() {
      try {
        const response = await api.get('/frete');

        setFrete(response.data);
      } catch (err) {
        if (err.response) {
          toast.error('Erro no servidor');
        } else {
          toast.error('Falha ao conectar com o servidor');
        }
      }
    }

    loadFrete();
  }, [updatingStatus]);

  async function handleSubmit(id) {
    try {
      await api.put(`frete/${id}`);
    } catch (err) {
      if (err.response) {
        toast.error('Erro no servidor');
      } else {
        toast.error('Falha ao conectar com o servidor');
      }
    }
  }

  const className = status => {
    switch (status) {
      case 'ATIVO':
        return 'text-success';
      case 'INATIVO':
        return 'text-danger';
      default:
        return '';
    }
  };

  const statusName = status => {
    switch (status) {
      case 'ATIVO':
        return 'Entrega Ativa';
      case 'INATIVO':
        return 'Entrega Inativa';
      default:
        return '';
    }
  };

  return (
    <div className="content-wrapper">
      <div className="content-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <h2 className="page-title">Entregas</h2>
              <div className="panel panel-default">
                <div className="panel-heading">Lista de bairros</div>
                <div className="panel-body">
                  <Form initialData={frete}>
                    {frete.map(item => (
                      <div className="form-group">
                        <label
                          htmlFor="name"
                          className="col-sm-2 control-label"
                        >
                          {item.name}
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <div className="col-sm-2">
                          <Input
                            placeholder="Valor R$"
                            type="price"
                            name="price"
                            className="form-control"
                          />
                        </div>
                        <label
                          htmlFor="name_loja"
                          className="col-sm-1 control-label"
                        >
                          Status
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <div className="col-sm-2">
                          <Select
                            required
                            name="status"
                            className="form-control"
                            options={[
                              { id: 'ATIVO', title: 'ATIVO' },
                              { id: 'INATIVO', title: 'INATIVO' },
                            ]}
                          />
                        </div>
                        <label
                          htmlFor="name_loja"
                          className="col-sm-2 control-label"
                        >
                          Situação
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <div className="col-sm-2">
                          <label disabled type="text" className="form-control">
                            {updatingStatus === item.id ? (
                              <div>{loading}</div>
                            ) : (
                              <b className={className(item.status)}>
                                {statusName(item.status)}
                              </b>
                            )}
                          </label>
                        </div>
                        <button
                          onClick={handleSubmit(item.id)}
                          style={{
                            marginTop: 1,
                            height: 45,
                            width: 60,
                            borderRadius: 10,
                          }}
                        >
                          Salvar
                        </button>
                      </div>
                    ))}

                    <div className="form-row">
                      <div className="form-group col-md-4">
                        <button
                          className="btn btn-warning btn-block"
                          type="submit"
                        >
                          {loading ? (
                            <Animation
                              width={30}
                              height={30}
                              animation={loadingData}
                            />
                          ) : (
                            'Salvar'
                          )}
                        </button>
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
