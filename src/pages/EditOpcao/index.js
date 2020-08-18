/* eslint-disable func-names */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-alert */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import { Form, Input, Select } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { useLocation, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { history } from '../../services/history';

import Animation from '../../components/Animation';
import * as loadingData from '../../assets/animations/loading.json';

import api from '../../services/api';

export default function EditVariacao() {
  const [opcao, setOpcao] = useState();

  const [loading, setLoading] = useState(false);

  const params = new URLSearchParams(useLocation().search);
  const id = params.get('id');

  const loadingAnimation = (
    <Animation width={30} height={30} animation={loadingData} />
  );

  useEffect(() => {
    async function loadOpcao() {
      try {
        const response = await api.get(`listOpcao/${id}`);
        setOpcao(response.data[0]);
      } catch (err) {
        if (err.response) {
          toast.error('Erro no servidor');
        } else {
          toast.error('Falha ao conectar com o servidor');
        }
      }
    }

    loadOpcao();
  }, [id]);

  async function handleSubmitVar(data) {
    setLoading(true);
    try {
      await api.put(`opcaovariacao/${id}`, data);

      document.getElementById('vd-form').reset();

      const response = await api.get(`listOpcao/${id}`);
      setOpcao(response.data[0]);

      toast.success('Opção editada com sucesso');
      setLoading(false);
    } catch (err) {
      if (err.response) {
        toast.error('Error no servidor');
      } else {
        toast.error('Falha ao conectar com o servidor');
      }
    }
  }

  return (
    <div className="content-wrapper" style={{ marginTop: 30 }}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-12">
                <div className="panel panel-default">
                  <div className="panel-heading">Editar variação</div>

                  <div className="panel-body">
                    <Button
                      onClick={history.goBack}
                      variant="contained"
                      color="primary"
                      startIcon={<ArrowBackIcon />}
                    >
                      Voltar
                    </Button>

                    <div className="panel-body">
                      <Form
                        initialData={opcao}
                        id="vd-form"
                        onSubmit={handleSubmitVar}
                        className="form-horizontal"
                      >
                        <div className="form-group">
                          <label
                            htmlFor="name"
                            className="col-sm-1 control-label"
                          >
                            Nome
                            <span style={{ color: 'red' }}>*</span>
                          </label>
                          <div className="col-sm-2">
                            <Input
                              required
                              type="text"
                              name="name"
                              className="form-control"
                              placeholder="Nome da opçao"
                            />
                          </div>
                          <label
                            htmlFor="price"
                            className="col-sm-1 control-label"
                          >
                            Preço
                            <span style={{ color: 'red' }}>*</span>
                          </label>
                          <div className="col-sm-2">
                            <Input
                              required
                              type="text"
                              name="price"
                              className="form-control"
                              placeholder="Preço"
                            />
                          </div>
                          <label
                            htmlFor="status"
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
                        </div>

                        <div className="hr-dashed" />

                        <div className="form-group">
                          <div className="col-sm-8 col-sm-offset-2">
                            <div style={{ display: 'flex' }}>
                              <button
                                name="submit"
                                type="submit"
                                style={{
                                  maxWidth: 120,
                                  minWidth: 120,
                                  minHeight: 30,
                                  maxHeight: 30,
                                  background: '#32cd32',
                                  borderRadius: 5,
                                  borderColor: '#32cd32',
                                  borderWidth: 2,
                                  color: '#fff',
                                }}
                                onClick={history.goBack}
                              >
                                {loading ? loadingAnimation : 'Atualizar'}
                              </button>
                            </div>
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
      </div>
    </div>
  );
}
