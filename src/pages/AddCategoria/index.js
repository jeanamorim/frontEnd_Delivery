/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Form, Input, Select } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { Icon, Menu, Table, Image, Button } from 'semantic-ui-react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { history } from '../../services/history';
import Animation from '../../components/Animation';
import * as loadingData from '../../assets/animations/loading.json';
import sample_default from '../../assets/img/sample_default.jpg';
import ImageInput from '../../components/ImageInput';

import api from '../../services/api';
import translate from '../../locales';

const schema = Yup.object().shape({
  name: Yup.string().required(translate('category_title_error')),
  image_id: Yup.number().required(translate('category_image_error')),
});

const loadingAnimation = (
  <Animation width={30} height={30} animation={loadingData} />
);

export default function AddCategory() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(data) {
    setLoading(true);
    try {
      await api.post('/categories', data);

      document.getElementById('vd-form').reset();
      document.getElementById('image-container').src = sample_default;
      document.getElementById('image').removeAttribute('data-file');
      document.getElementById('image_id').value = null;

      setLoading(false);
      toast.success(translate('category_added_success'));
    } catch (err) {
      if (err.response) {
        toast.error(translate('server_error'));
      } else {
        toast.error(translate('server_connection_error'));
      }
    }
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
                    <div style={{ display: 'flex' }}>
                      <Button onClick={history.goBack}>
                        <Icon name="chevron left" /> Voltar
                      </Button>
                    </div>
                  </div>

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
                          Nome da categoria
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <div className="col-sm-3">
                          <Input
                            placeholder="Um nome para esta categoria"
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
                        <div className="col-sm-3">
                          <Select
                            placeholder="Selecione um status"
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
