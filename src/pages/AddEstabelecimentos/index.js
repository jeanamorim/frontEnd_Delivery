/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { Form, Input, Select } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import Animation from '../../components/Animation';
import * as loadingData from '../../assets/animations/loading.json';

import ImageInput from '../../components/ImageInput';

import api from '../../services/api';
import DatePicker from './DatePicker';
import sample_default from '../../assets/img/sample_default.jpg';

const schema = Yup.object().shape({
  image_id: Yup.number().required('A imagem é obrigatória'),
  name: Yup.string().required('O nome do parceiro é obrigatório'),
  name_loja: Yup.string().required('O nome da loja é obrigatório'),
  status: Yup.string().required('O status é obrigatório'),
  avaliacao: Yup.string().required('Avaliação é obrigatório'),
  categoria: Yup.string().required('A categoria é obrigatório'),
  tempo_entrega: Yup.string().required('O tempo de entrega é obrigatório'),
  email: Yup.string().required('O email é obrigatório'),
  password: Yup.string().required('A senha é obrigatório'),
  phone: Yup.string().required('O telefone é obrigatório'),
  gender: Yup.string().required('O ngênero é obrigatório'),
  cpf: Yup.string().required('O CPF é obrigatório'),
  birthday: Yup.string().required('A data de nascimento é obrigatório'),
});

export default function AddProduct() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(data) {
    setLoading(true);
    try {
      await api.post('/estabelecimento', data);

      document.getElementById('vd-form').reset();
      document.getElementById('image-container').src = sample_default;
      document.getElementById('image').removeAttribute('data-file');
      document.getElementById('image_id').value = null;

      setLoading(false);
      toast.success('Estabelecimento cadastrado com sucesso');
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

  const loadingAnimation = (
    <Animation width={30} height={30} animation={loadingData} />
  );

  return (
    <div className="content-wrapper" style={{ marginTop: 20 }}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-12">
                <div className="panel panel-default">
                  <div className="panel-heading">Cadastrar um parceiro</div>
                  <div className="panel-body">
                    <Form
                      id="vd-form"
                      onSubmit={handleSubmit}
                      schema={schema}
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
                          Imagem da loja
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <br />
                        <ImageInput name="image_id" />
                      </div>

                      <div className="form-group">
                        <label
                          htmlFor="name"
                          className="col-sm-2 control-label"
                        >
                          Nome do parceiro
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <div className="col-sm-4">
                          <Input
                            type="text"
                            name="name"
                            className="form-control"
                          />
                        </div>
                        <label
                          htmlFor="name_loja"
                          className="col-sm-2 control-label"
                        >
                          Estabelecimento
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <div className="col-sm-4">
                          <Input
                            type="text"
                            name="name_loja"
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label
                          htmlFor="avaliacao"
                          className="col-sm-2 control-label"
                        >
                          Avaliação
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <div className="col-sm-4">
                          <Select
                            name="avaliacao"
                            className="form-control"
                            options={[
                              { id: '5.0', title: '5.0' },
                              { id: '4.9', title: '4.9' },
                              { id: '4.8', title: '4.8' },
                              { id: '4.7', title: '4.7' },
                              { id: '4.6', title: '4.6' },
                              { id: '4.5', title: '4.5' },
                              { id: '4.4', title: '4.4' },
                              { id: '4.3', title: '4.3' },
                              { id: '4.2', title: '4.2' },
                              { id: '4.1', title: '4.1' },
                              { id: '4.0', title: '4.0' },
                            ]}
                          />
                        </div>
                        <label
                          htmlFor="status"
                          className="col-sm-2 control-label"
                        >
                          Status
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <div className="col-sm-4">
                          <Select
                            name="status"
                            className="form-control"
                            options={[
                              { id: 'ABERTO', title: 'ABERTO' },
                              { id: 'FECHADO', title: 'FECHADO' },
                            ]}
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label
                          htmlFor="email"
                          className="col-sm-2 control-label"
                        >
                          E-mail
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <div className="col-sm-4">
                          <Input
                            type="text"
                            name="email"
                            className="form-control"
                          />
                        </div>
                        <label
                          htmlFor="password"
                          className="col-sm-2 control-label"
                        >
                          Senha
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <div className="col-sm-4">
                          <Input
                            type="text"
                            name="password"
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label
                          htmlFor="phone"
                          className="col-sm-2 control-label"
                        >
                          Telefone
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <div className="col-sm-4">
                          <Input
                            type="text"
                            name="phone"
                            className="form-control"
                          />
                        </div>
                        <label
                          htmlFor="birthday"
                          className="col-sm-2 control-label"
                        >
                          Data de nascimento
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <div className="col-sm-4">
                          <DatePicker name="birthday" />
                        </div>
                      </div>

                      <div className="form-group">
                        <label
                          htmlFor="gender"
                          className="col-sm-2 control-label"
                        >
                          Gênero
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <div className="col-sm-4">
                          <Select
                            name="gender"
                            className="form-control"
                            options={[
                              { id: 'M', title: 'Masculino' },
                              { id: 'F', title: 'Feminino' },
                            ]}
                          />
                        </div>
                        <label htmlFor="cpf" className="col-sm-2 control-label">
                          CPF
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <div className="col-sm-4">
                          <Input
                            type="text"
                            name="cpf"
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label
                          htmlFor="categoria"
                          className="col-sm-2 control-label"
                        >
                          Categoria
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <div className="col-sm-4">
                          <Select
                            name="categoria"
                            className="form-control"
                            options={[
                              { id: 'SUPEMERCADO', title: 'SUPEMERCADO' },
                              { id: 'FRUTAS', title: 'FRUTAS' },
                              { id: 'PIZZARIAS', title: 'PIZZARIAS' },
                              { id: 'LANCHES', title: 'LANCHES' },
                            ]}
                          />
                        </div>
                        <label
                          htmlFor="tempo_entrega"
                          className="col-sm-2 control-label"
                        >
                          Tempo de entrega
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <div className="col-sm-4">
                          <Select
                            name="tempo_entrega"
                            className="form-control"
                            options={[
                              { id: '10-20', title: '10-20' },
                              { id: '20-30', title: '20-30' },
                              { id: '30-40', title: '30-40' },
                              { id: '40-50', title: '40-50' },
                              { id: '50-60', title: '50-60' },
                            ]}
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
                                document.getElementById(
                                  'image-container',
                                ).src = sample_default;
                                document
                                  .getElementById('image')
                                  .removeAttribute('data-file');
                                document.getElementById(
                                  'image_id',
                                ).value = null;
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
