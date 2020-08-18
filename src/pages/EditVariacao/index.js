/* eslint-disable react-hooks/exhaustive-deps */
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
import Icon from '@material-ui/core/Icon';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';

import { history } from '../../services/history';
import { formatPrice } from '../../util/format';
import Animation from '../../components/Animation';
import * as loadingData from '../../assets/animations/loading.json';
import Table from '../../components/Table';
import api from '../../services/api';

export default function EditVariacao() {
  const [variacao, setVariacao] = useState([]);
  const [opcao, setOpcao] = useState();

  const [render, setRender] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(0);
  const [pegaId, setPegaIds] = useState([]);
  const [value, setValue] = useState({});
  const [loading, setLoading] = useState(false);
  const [removing, setRemoving] = useState(0);

  const params = new URLSearchParams(useLocation().search);
  const id = params.get('id');

  const loadingAnimation = (
    <Animation width={30} height={30} animation={loadingData} />
  );
  async function getVariacao() {
    try {
      const response = await api.get(`variacaoedit/${id}`);
      const ArrayIds = response.data[0].opcao.map(function(item) {
        return item.id;
      });
      setPegaIds(ArrayIds);
      setOpcao(response.data[0].opcao);
      setVariacao(response.data);
      if (updatingStatus !== 0) {
        setUpdatingStatus(0);
        toast.success('Status alterado com sucesso');
      }
    } catch (err) {
      if (err.response) {
        toast.error('Error no servidor');
      } else {
        toast.error('Falha ao conectar com o servidor');
      }
    }
  }
  useEffect(() => {
    getVariacao();
  }, []);
  async function handleEditSubmit(data) {
    setLoading(true);
    try {
      await api.put(`variacao/${id}`, data);
      getVariacao();
      document.getElementById('vd-form').reset();
      toast.success('Variação alterada com sucesso');
      setLoading(false);
    } catch (err) {
      if (err.response) {
        toast.error('Error no servidor');
      } else {
        toast.error('Falha ao conectar com o servidor');
      }
    }
  }
  async function handleSubmitOpcao(data) {
    setLoading(true);
    try {
      const response = await api.post(`opcaovariacao`, data);
      const idOp = response.data.id;

      await api.put(`variacao/${id}`, {
        opcao: [...pegaId, idOp],
      });
      getVariacao();
      document.getElementById('vd-formm').reset();
      toast.success('Opção adicionada com sucesso');

      setLoading(false);
    } catch (err) {
      if (err.response) {
        toast.error('Error no servidor');
      } else {
        toast.error('Falha ao conectar com o servidor');
      }
    }
  }
  async function handleRemove(item) {
    try {
      setRemoving(id);
      await api.delete(`/opcaovariacao/${item}`);
      setRender(!render);
      getVariacao();
      toast.success('Opção removida com sucesso');
    } catch (err) {
      if (err.response) {
        toast.error('Erro no servidor');
      } else {
        toast.error('Falha ao conectar com o servidor');
      }
    }
  }
  async function handleChange(event) {
    const status = event.target.value;
    const orderId = event.target.id;
    setValue({
      id: Number(orderId),
      status,
    });

    if (status !== '') {
      setUpdatingStatus(orderId);
      try {
        await api.put(`/opcaovariacao/${orderId}`, {
          status,
        });

        setRender(!render);
      } catch (err) {
        if (err.response) {
          toast.error('Erro no servidor');
        } else {
          toast.error('Falha ao conectar com o servidor');
        }
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
        return 'Ativo';

      case 'INATIVO':
        return 'Inativa';
      default:
        return '';
    }
  };

  let data;

  if (opcao) {
    data = opcao.map(item => ({
      id: item.id,
      name: item.name,
      valor: formatPrice(item.price),

      actionStatus: (
        <select
          id={item.id}
          value={value.id === item.id ? value.status : ''}
          onChange={handleChange}
        >
          <option> </option>
          <option value="ATIVO">ATIVO</option>
          <option value="INATIVO">INATIVO</option>
        </select>
      ),

      status:
        Number(updatingStatus) === item.id ? (
          <div>{loadingAnimation}</div>
        ) : (
          <b className={className(item.status)}>{statusName(item.status)}</b>
        ),

      action:
        removing === item.id ? (
          <div
            style={{
              paddingTop: 10,
            }}
          >
            {loading}
          </div>
        ) : (
          <div
            style={{
              lineHeight: '50px',
              textAlign: 'center',
            }}
          >
            <i
              role="presentation"
              onKeyPress={() => handleRemove(item.id)}
              onClick={() => {
                if (
                  window.confirm(
                    `Tem certeza que deseja remover a opção ${item.name} ?`,
                  )
                )
                  handleRemove(item.id);
              }}
              // pencil icon editar
              className="fa fa-trash"
              style={{
                color: '#f00',
                cursor: 'pointer',
                fontSize: 15,
              }}
            />
          </div>
        ),
      view: (
        <Link
          to={{
            pathname: '/Editopcao',
            search: `?id=${item.id}`,
            state: {
              orderData: item,
            },
          }}
        >
          <div
            style={{
              lineHeight: '50px',
              textAlign: 'center',
            }}
          >
            <i
              className="fa fa-pencil"
              style={{
                color: '#000',
                cursor: 'pointer',
                fontSize: 20,
              }}
            />
          </div>
        </Link>
      ),
    }));
  }

  const columns = [
    {
      label: 'Id',
      field: 'id',
      sort: 'asc',
      width: 10,
    },
    {
      label: 'Nome',
      field: 'name',
      sort: 'asc',
      width: 10,
    },
    {
      label: 'Valor',
      field: 'valor',
      sort: 'asc',
      width: 10,
    },

    {
      label: 'Status',
      field: 'status',
      sort: 'asc',
      width: 10,
    },
    {
      label: 'Alterar status',
      field: 'actionStatus',
      sort: 'asc',
      width: 10,
    },
    {
      label: 'Apagar',
      field: 'action',
      sort: 'asc',
      width: 10,
    },
    {
      label: 'Editar',
      field: 'view',
      sort: 'asc',
      width: 10,
    },
  ];

  const rows = [
    {
      name: loading,
      valor: loading,
      status: loading,
      actionStatus: loading,
      opcao: loading,
      action: loading,
      view: loading,
    },
  ];

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
                        initialData={variacao[0]}
                        id="vd-form"
                        onSubmit={handleEditSubmit}
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
                              placeholder="Nome da variação"
                            />
                          </div>
                          <label
                            htmlFor="minimo"
                            className="col-sm-1 control-label"
                          >
                            Mínimo
                            <span style={{ color: 'red' }}>*</span>
                          </label>
                          <div className="col-sm-2">
                            <Input
                              required
                              type="text"
                              name="minimo"
                              className="form-control"
                              placeholder="Quant. Mínima"
                            />
                          </div>
                          <label
                            htmlFor="maximo"
                            className="col-sm-1 control-label"
                          >
                            Máximo
                            <span style={{ color: 'red' }}>*</span>
                          </label>
                          <div className="col-sm-2">
                            <Input
                              required
                              type="text"
                              name="maximo"
                              className="form-control"
                              placeholder="Quant. Máxima"
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
                                  width: '20%',
                                  background: '#32cd32',
                                  color: '#fff',
                                  borderColor: '#fff',
                                  height: 35,
                                  borderRadius: 6,
                                }}
                              >
                                {loading ? loadingAnimation : 'Salvar'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </Form>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                      }}
                    >
                      <Button
                        data-toggle="modal"
                        data-target="#exampleModal"
                        data-whatever="@mdo"
                        variant="contained"
                        startIcon={<AddIcon />}
                        style={{
                          background: '#32cd32',
                          color: '#fff',
                          margin: 5,
                        }}
                      >
                        Adicionar Opção
                      </Button>
                    </div>
                    <div className="row" style={{ marginTop: 20 }}>
                      <div className="col-md-12">
                        <div className="panel panel-default">
                          <div className="panel-heading">
                            Lista de opções da variação
                          </div>
                          <div className="panel-body">
                            <Table rows={data || rows} columns={columns} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="modal fade"
                      id="exampleModal"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog" role="document">
                        <div
                          className="modal-content"
                          style={{ borderColor: '#fff', borderWidth: 2 }}
                        >
                          <div
                            className="modal-header"
                            style={{ background: '#000', borderRadius: 7 }}
                          >
                            <h5
                              className="modal-title"
                              id="exampleModalLabel"
                              style={{ color: '#fff' }}
                            >
                              Adicionar opção a variaçao
                            </h5>
                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              aria-label="Fechar"
                            >
                              <span
                                aria-hidden="true"
                                style={{
                                  color: '#ffff',
                                  borderCoolor: '#fff',
                                  borderWidth: 2,
                                }}
                              >
                                &times;
                              </span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <Form id="vd-formm" onSubmit={handleSubmitOpcao}>
                              <div className="form-group">
                                <label
                                  htmlFor="name"
                                  className="col-form-label"
                                >
                                  Nome da variação:
                                  <span style={{ color: 'red' }}>*</span>
                                </label>
                                <Input
                                  required
                                  type="text"
                                  name="name"
                                  className="form-control"
                                  placeholder="Nome da opção"
                                />
                              </div>
                              <div className="form-group">
                                <label
                                  htmlFor="price"
                                  className="col-form-label"
                                >
                                  Preço:
                                  <span style={{ color: 'red' }}>*</span>
                                </label>
                                <Input
                                  required
                                  name="price"
                                  type="text"
                                  className="form-control"
                                  placeholder="preço"
                                />
                              </div>
                              <div className="form-group">
                                <label
                                  htmlFor="status"
                                  className="col-form-label"
                                >
                                  Status:
                                  <span style={{ color: 'red' }}>*</span>
                                </label>
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
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  data-dismiss="modal"
                                >
                                  Fechar
                                </button>
                                <button
                                  name="submit"
                                  type="submit"
                                  className="btn btn-primary"
                                >
                                  Enviar
                                </button>
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
        </div>
      </div>
    </div>
  );
}
