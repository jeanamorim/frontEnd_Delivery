/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-alert */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import { Form, Input, Select } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import Button from '@material-ui/core/Button';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { history } from '../../services/history';
import Animation from '../../components/Animation';
import * as loadingData from '../../assets/animations/loading.json';
import ImageInput from '../../components/ImageInput';

import api from '../../services/api';

import sample_default from '../../assets/cam.jpg';
import translate from '../../locales';

const schema = Yup.object().shape({
  image_id: Yup.number().required(translate('product_image_error')),
  name: Yup.string().required(translate('product_title_error')),
  category_id: Yup.string().required(translate('product_category_error')),
  description: Yup.string().required(translate('product_description_error')),
  quantity: Yup.string()
    .matches(/^[+]?([.]\d+|\d+[.]?\d*)$/, translate('product_quantity_error_1'))
    .required(translate('product_quantity_error_2')),
  unit: Yup.string().required(translate('product_unit_error')),
  price: Yup.string()
    .matches(/^[+]?([.]\d+|\d+[.]?\d*)$/, translate('product_price_error_1'))
    .required(translate('product_price_error_2')),
});

export default function AddProduct() {
  const [categories, setCategories] = useState([]);
  const [produto, setProduto] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(data) {
    setLoading(true);
    try {
      const response = await api.post('/products', data);

      document.getElementById('vd-form').reset();
      document.getElementById('image-container').src = sample_default;
      document.getElementById('image').removeAttribute('data-file');
      document.getElementById('image_id').value = null;
      setProduto(response.data);
      setLoading(false);
      toast.success(translate('product_added_success'));
    } catch (err) {
      if (err.response) {
        toast.error(translate('server_error'));
        setLoading(false);
      } else {
        toast.error(translate('server_connection_error'));
        setLoading(false);
      }
    }
  }
  async function handleSubmitVar(data) {
    setLoading(true);
    try {
      await api.post('/variacao', {
        ...data,
        product_id: produto.id,
      });

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

  const loadingAnimation = (
    <Animation width={30} height={30} animation={loadingData} />
  );

  const options = categories.map(category => ({
    id: category.id,
    title: category.name,
  }));

  return (
    <div className="content-wrapper" style={{ marginTop: 40 }}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-12">
                <div className="panel panel-default">
                  <div className="panel-heading">Novo produto</div>

                  <div className="panel-body">
                    <Button
                      onClick={history.goBack}
                      variant="contained"
                      color="primary"
                      startIcon={<ArrowBackIcon />}
                    >
                      Voltar
                    </Button>

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
                          Imagem do produto
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
                          Nome do produto
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <div className="col-sm-3">
                          <Input
                            placeholder="Nome do produto"
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
                            placeholder="Selecione uma categoria..."
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
                            placeholder="Uma descrição para este produto"
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
                            placeholder="Um preço para este produto"
                            value={produto.price}
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
                            placeholder="Selecione a quantidade em estoque"
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
                            placeholder="Uma unidade para este produto"
                            value={produto.unit}
                            name="unit"
                            className="form-control"
                            options={[
                              { id: 'kg', title: 'kg' },
                              { id: 'g', title: 'g' },
                              { id: 'dz', title: 'dz' },
                              { id: 'un', title: 'un' },
                              { id: '0', title: 'Nenhum' },
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
                                height: 35,
                                borderRadius: 6,
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
                                height: 35,
                                borderRadius: 6,
                              }}
                            >
                              {loading ? loadingAnimation : 'Cadastrar'}
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
