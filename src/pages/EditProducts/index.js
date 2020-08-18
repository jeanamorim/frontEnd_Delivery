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
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import { history } from '../../services/history';
import Animation from '../../components/Animation';
import * as loadingData from '../../assets/animations/loading.json';
import Table from '../../components/Table';
import ImageInput from './AvatarInput';
import api from '../../services/api';
import translate from '../../locales';

export default function AddProduct() {
  const [categories, setCategories] = useState([]);
  const [produto, setProduto] = useState([]);
  const [variacao, setVariacao] = useState([]);
  const [render, setRender] = useState(false);
  const [idvariacao, setIdvariacao] = useState([]);
  const [removing, setRemoving] = useState(0);
  const [loading, setLoading] = useState(false);
  const params = new URLSearchParams(useLocation().search);
  const id = params.get('id');

  const loadingAnimation = (
    <Animation width={30} height={30} animation={loadingData} />
  );
  async function loadProduct() {
    try {
      const response = await api.get(`productsEdit/${id}`);

      const data = {
        ...response.data[0],
        url: response.data[0].image.url,
      };
      const ArrayIds = data.variacao.map(function(item) {
        return item.id;
      });
      setVariacao(data.variacao);
      setIdvariacao(ArrayIds);
      setProduto(data);
    } catch (err) {
      if (err.response) {
        toast.error('Erro no servidor');
      } else {
        toast.error('Falha ao conectar com o servidor');
      }
    }
  }
  useEffect(() => {
    loadProduct();
  }, []);

  async function handleSubmit(data) {
    setLoading(true);
    try {
      await api.put(`products/${id}`, data);

      setLoading(false);
      toast.success('Produto atualizado com sucesso');
    } catch (err) {
      if (err.response) {
        toast.error('Erro no servidor');
        setLoading(false);
      } else {
        toast.error('Falha ao conectar com o servidor');
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await api.get('/categories');

        setCategories(response.data);
      } catch (err) {
        if (err.response) {
          toast.error(translate('server_error'));
        } else {
          toast.error(translate('server_connection_error'));
        }
      }
    }

    loadCategories();
  }, []);

  const options = categories.map(category => ({
    id: category.id,
    title: category.name,
  }));

  async function handleSubmitVar(data) {
    setLoading(true);
    try {
      const response = await api.post('/variacao', data);
      const idvar = response.data.id;

      await api.put(`products/${id}`, {
        variacao: [...idvariacao, idvar],
      });
      loadProduct();
      document.getElementById('vd-form').reset();
      setLoading(false);
      toast.success('Variação adicionada com sucesso');
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
      await api.delete(`/variacao/${item}`);
      loadProduct();
      setRender(!render);
      toast.success('Variação removida com sucesso');
    } catch (err) {
      if (err.response) {
        toast.error('Erro no servidor');
      } else {
        toast.error('Falha ao conectar com o servidor');
      }
    }
  }

  let data;

  if (variacao) {
    data = variacao.map(item => ({
      name: item.name,
      minimo: item.minimo,
      maximo: item.maximo,
      opcao: (
        <div
          to="/home"
          style={{
            lineHeight: '50px',
            textAlign: 'center',
            color: '#0000EE',
          }}
        >
          <i>Qtd.Opção({item.opcao.length})</i>
        </div>
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
                    `Tem certeza que deseja remover a variação ${item.name} ?`,
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
            pathname: '/editVariacao',
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
      label: 'Nome',
      field: 'name',
      sort: 'asc',
      width: 30,
    },
    {
      label: 'Qtd. Mínima',
      field: 'minimo',
      sort: 'asc',
      width: 30,
    },
    {
      label: 'Qtd. Máxima',
      field: 'maximo',
      sort: 'asc',
      width: 30,
    },

    {
      label: 'Qtd. Opções',
      field: 'opcao',
      sort: 'asc',
      width: 20,
    },
    {
      label: 'Apagar',
      field: 'action',
      sort: 'asc',
      width: 20,
    },
    {
      label: 'Editar',
      field: 'view',
      sort: 'asc',
      width: 20,
    },
  ];

  const rows = [
    {
      name: loading,
      minimo: loading,
      maximo: loading,

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
                  <div className="panel-heading">Editar produto</div>

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
                        initialData={produto}
                        onSubmit={handleSubmit}
                        className="form-horizontal"
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                          }}
                        >
                          <label htmlFor="price" className="control-label">
                            Imagem o produto
                            <span style={{ color: 'red' }}>*</span>
                          </label>
                          <br />
                          <ImageInput name="image_id" urlImage={produto.url} />
                        </div>

                        <div className="form-group">
                          <label
                            htmlFor="name"
                            className="col-sm-2 control-label"
                          >
                            Nome do produto
                            <span style={{ color: 'red' }}>*</span>
                          </label>
                          <div className="col-sm-3">
                            <Input
                              required
                              type="text"
                              name="name"
                              className="form-control"
                            />
                          </div>
                          <label
                            htmlFor="category"
                            className="col-sm-2 control-label"
                          >
                            Categoria
                            <span style={{ color: 'red' }}>*</span>
                          </label>
                          <div className="col-sm-3">
                            <Select
                              required
                              name="category_id"
                              className="form-control"
                              options={options}
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="description"
                            className="col-sm-2 control-label"
                          >
                            Descrição
                            <span style={{ color: 'red' }}>*</span>
                          </label>
                          <div className="col-sm-3">
                            <Input
                              className="form-control"
                              name="description"
                              multiline
                            />
                          </div>
                          <label
                            htmlFor="price"
                            className="col-sm-2 control-label"
                          >
                            Preço
                            <span style={{ color: 'red' }}>*</span>
                          </label>
                          <div className="col-sm-3">
                            <Input
                              required
                              type="text"
                              name="price"
                              className="form-control"
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label
                            htmlFor="quantity"
                            className="col-sm-2 control-label"
                          >
                            Quantidade
                            <span style={{ color: 'red' }}>*</span>
                          </label>
                          <div className="col-sm-3">
                            <Input
                              required
                              type="text"
                              name="quantity"
                              className="form-control"
                            />
                          </div>
                          <label
                            htmlFor="unit"
                            className="col-sm-2 control-label"
                          >
                            Unidade
                            <span style={{ color: 'red' }}>*</span>
                          </label>
                          <div className="col-sm-3">
                            <Select
                              name="unit"
                              className="form-control"
                              options={[
                                { id: 'kg', title: 'kg' },
                                { id: 'g', title: 'g' },
                                { id: 'dz', title: 'dz' },
                                { id: 'un', title: 'un' },
                              ]}
                            />
                          </div>
                        </div>
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
                        type="button"
                        className="btn btn-primary"
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
                        Adicionar Variação
                      </Button>
                    </div>

                    <div className="row" style={{ marginTop: 20 }}>
                      <div className="col-md-12">
                        <div className="panel-body">
                          <Table rows={data || rows} columns={columns} />
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
                              Adicionar variação
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
                            <Form id="vd-form" onSubmit={handleSubmitVar}>
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexDirection: 'column',
                                }}
                              >
                                <label
                                  htmlFor="price"
                                  className="control-label"
                                >
                                  Imagem o produto
                                  <span style={{ color: 'red' }}>*</span>
                                </label>
                                <br />
                                <ImageInput
                                  name="image_id"
                                  urlImage={produto.url}
                                />
                              </div>
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
                                  placeholder="Nome da variação"
                                />
                              </div>
                              <div className="form-group">
                                <label
                                  htmlFor="minimo"
                                  className="col-form-label"
                                >
                                  Qtd. Miníma:
                                  <span style={{ color: 'red' }}>*</span>
                                </label>
                                <Input
                                  required
                                  name="minimo"
                                  type="text"
                                  className="form-control"
                                  placeholder="Quant. Mínima"
                                />
                              </div>
                              <div className="form-group">
                                <label
                                  htmlFor="maximo"
                                  className="col-form-label"
                                >
                                  Qtd: Máxima:
                                  <span style={{ color: 'red' }}>*</span>
                                </label>
                                <Input
                                  required
                                  name="maximo"
                                  type="text"
                                  className="form-control"
                                  placeholder="Quant. Máxima"
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
