/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import React from 'react';
import { Form, Input, Select } from '@rocketseat/unform';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Icon, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
// import { Container } from './styles';
import DatePicker from './DatePicker';
import ImageInput from './AvatarInput';
import translate from '../../locales';
import Animation from '../../components/Animation';
import * as loadingData from '../../assets/animations/loading.json';
import 'react-datepicker/dist/react-datepicker.css';

import { updateProfileRequest } from '../../store/modules/user/actions';

const schema = Yup.object().shape({
  name: Yup.string().required(translate('profile_first_name_error')),
  last_name: Yup.string().required(translate('profile_last_name_error')),
  email: Yup.string()
    .email(translate('profile_email_error_1'))
    .required(translate('profile_email_error_2')),
  phone: Yup.number()
    .test(
      'len',
      translate('profile_phone_error_1'),
      val =>
        (val && val.toString().length === 10) || val.toString().length === 11,
    )
    .required(translate('profile_phone_error_2')),

  birthday: Yup.date()
    .typeError(translate('profile_birthday_error_1'))
    .required(translate('profile_birthday_error_2')),
  gender: Yup.string().required(translate('profile_gender_error')),
  cpf: Yup.number()
    .typeError(translate('profile_national_id_error_1'))
    .required(translate('profile_national_id_error_2')),
  oldPassword: Yup.string(),
  password: Yup.string().when('oldPassword', (oldPassword, field) =>
    oldPassword
      ? field
          .min(6, translate('profile_new_password_error_1'))
          .required(translate('profile_new_password_error_2'))
      : field,
  ),
  confirmPassword: Yup.string().when('password', (password, field) =>
    password
      ? field
          .required(translate('profile_password_confirmation_error_2'))
          .oneOf(
            [Yup.ref('password')],
            translate('profile_password_confirmation_error_1'),
          )
      : field,
  ),
});

export default function Configuracao() {
  const dispatch = useDispatch();

  const profile = useSelector(state => state.user.profile);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  return (
    <div className="content-wrapper" style={{ marginTop: 40 }}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-default">
              <div className="panel-heading">Seu perfil</div>
              <div className="panel-body">
                <Form
                  initialData={profile}
                  onSubmit={handleSubmit}
                  id="vd-form"
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
                    <label htmlFor="name" className="col-sm-2 control-label">
                      Nome do parceiro
                      <span style={{ color: 'red' }}>*</span>
                    </label>
                    <div className="col-sm-4">
                      <Input type="text" name="name" className="form-control" />
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
                        disabled
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
                    <label htmlFor="status" className="col-sm-2 control-label">
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
                    <label htmlFor="email" className="col-sm-2 control-label">
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
                      htmlFor="birthday"
                      className="col-sm-2 control-label"
                    >
                      Data de nascimento
                      <span style={{ color: 'red' }}>*</span>
                    </label>
                    <div className="col-sm-4">
                      <DatePicker birthday={profile.birthday} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone" className="col-sm-2 control-label">
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
                    <label htmlFor="cpf" className="col-sm-2 control-label">
                      CPF
                      <span style={{ color: 'red' }}>*</span>
                    </label>
                    <div className="col-sm-4">
                      <Input type="text" name="cpf" className="form-control" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="gender" className="col-sm-2 control-label">
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
                      htmlFor="password"
                      className="col-sm-2 control-label"
                    >
                      Senha atual
                      <span style={{ color: 'red' }}>*</span>
                    </label>
                    <div className="col-sm-4">
                      <Input
                        type="password"
                        name="oldPassword"
                        id="oldPassword"
                        className="form-control"
                        placeholder={translate('profile_password_placeholder')}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label
                      htmlFor="password"
                      className="col-sm-2 control-label"
                    >
                      Nova senha
                      <span style={{ color: 'red' }}>*</span>
                    </label>
                    <div className="col-sm-4">
                      <Input
                        type="password"
                        name="password"
                        id="password"
                        className="form-control input-md"
                        placeholder={translate(
                          'profile_new_password_placeholder',
                        )}
                      />
                    </div>

                    <label
                      htmlFor="password"
                      className="col-sm-2 control-label"
                    >
                      Comfirme sua senha
                      <span style={{ color: 'red' }}>*</span>
                    </label>
                    <div className="col-sm-4">
                      <Input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        className="form-control input-md"
                        placeholder={translate(
                          'profile_password_confirmation_placeholder',
                        )}
                      />
                    </div>
                  </div>

                  <div className="hr-dashed" />

                  <div className="form-group">
                    <div className="col-sm-8 col-sm-offset-2">
                      <div style={{ display: 'flex' }}>
                        <button
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
                          Salvar
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
  );
}
