/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import { Form, Input, Select } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { useLocation, Link } from 'react-router-dom';
import { history } from '../../services/history';
// import Animation from '../../components/Animation';
// import * as loadingData from '../../assets/animations/loading.json';
import ImageInput from './AvatarInput';
import api from '../../services/api';
import Animation from '../../components/Animation';
import * as loadingData from '../../assets/animations/loading.json';

export default function EditCategoria() {
  const [categoria, setCategoria] = useState([]);
  const [loading, setLoading] = useState(false);
  // const loading = <Animation width={30} height={30} animation={loadingData} />;
  const params = new URLSearchParams(useLocation().search);
  const id = params.get('id');

  async function handleSubmit(data) {
    setLoading(true);
    try {
      await api.put(`categories/${id}`, data);

      setLoading(false);
      toast.success('Categoria atualizado com sucesso');
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
    async function loadOrder() {
      try {
        const response = await api.get(`categorialist/${id}`);

        const data = {
          ...response.data[0],
          url: response.data[0].image.url,
        };

        setCategoria(data);
      } catch (err) {
        if (err.response) {
          toast.error('Erro no servidor');
        } else {
          toast.error('Falha ao conectar com o servidor');
        }
      }
    }

    loadOrder();
  }, [id]);
  const loadingAnimation = (
    <Animation width={30} height={30} animation={loadingData} />
  );

  return (
    <div className="content-wrapper" style={{ marginTop: 10 }}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-12">
                <div className="panel panel-default">
                  <div className="panel-heading">Cadastrar um parceiro</div>

                  <div className="panel-body">
                    <div style={{ display: 'flex' }}>
                      <button
                        onClick={history.goBack}
                        style={{
                          background: '#32cd32',
                          width: 150,
                          color: '#fff',
                          margin: 1,
                          borderRadius: 5,
                          borderColor: '#fff',
                        }}
                      >
                        Voltar
                      </button>
                    </div>
                    <Form
                      id="vd-form"
                      className="form-horizontal"
                      initialData={categoria}
                      onSubmit={handleSubmit}
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
                          Imagem da loja
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <br />
                        <ImageInput name="image_id" urlImage={categoria.url} />
                      </div>

                      <div className="form-group">
                        <label
                          htmlFor="name"
                          className="col-sm-2 control-label"
                        >
                          Nome da categoria
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <div className="col-sm-4">
                          <Input
                            required
                            type="text"
                            name="name"
                            className="form-control"
                          />
                        </div>
                        <label
                          htmlFor="name_loja"
                          className="col-sm-2 control-label"
                        >
                          Status
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <div className="col-sm-4">
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
                                width: '20%',
                                background: '#32cd32',
                                color: '#fff',
                                borderColor: '#fff',
                              }}
                            >
                              Salvar
                            </button>
                          </div>
                        </div>
                      </div>
                    </Form>
                  </div>
                  <div className="panel-body">
                    <Form id="vd-form" className="form-horizontal">
                      <div className="form-group">
                        <label
                          htmlFor="name"
                          className="col-sm-2 control-label"
                        >
                          Nome
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <div className="col-sm-2">
                          <Input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Nome da variação"
                          />
                        </div>
                        <label
                          htmlFor="minimo"
                          className="col-sm-2 control-label"
                        >
                          Mínimo
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <div className="col-sm-2">
                          <Input
                            type="text"
                            name="minimo"
                            className="form-control"
                            placeholder="Quant. Mínima"
                          />
                        </div>
                        <label
                          htmlFor="maximo"
                          className="col-sm-2 control-label"
                        >
                          Máximo
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <div className="col-sm-2">
                          <Input
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
                              style={{
                                width: '20%',
                                background: '#999',
                                color: '#fff',
                                borderColor: '#fff',
                              }}
                              type="button"
                              onClick={() => {
                                document.getElementById('vd-form').reset();
                              }}
                            >
                              Limpar
                            </button>
                            <button
                              name="submit"
                              type="submit"
                              style={{
                                width: '20%',
                                background: '#32cd32',
                                color: '#fff',
                                borderColor: '#fff',
                              }}
                            >
                              {loading ? loadingAnimation : 'Salvar'}
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
  );
}
