import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input, Check } from '@rocketseat/unform';
import * as Yup from 'yup';

import Animation from '../../components/Animation';
import * as loadingData from '../../assets/animations/loading.json';

import { signInRequest } from '../../store/modules/auth/actions';

import bg from '../../assets/img/login-bg.png';
import logo from '../../assets/img/logo12.png';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um email válido')
    .required('O email é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
  checkbox: Yup.bool().required(),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <div
      className="login-page bk-img"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="form-content">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-md-offset-3 mt-4x">
              <div className="well row pt-2x pb-3x bk-light">
                <div className="col-md-8 col-md-offset-2">
                  <div className="text-center">
                    <img src={logo} style={{ width: 100 }} alt="" />
                  </div>
                  <Form
                    onSubmit={handleSubmit}
                    id="vd-form"
                    schema={schema}
                    className="mt"
                  >
                    <div>
                      <label htmlFor="email" className="text-uppercase text-sm">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="text"
                        placeholder="Digite seu email"
                        className="form-control"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="text-uppercase text-sm mt"
                      >
                        Senha
                      </label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Digite sua senha"
                        className="form-control"
                      />
                    </div>
                    <div className="checkbox checkbox-circle checkbox-info">
                      <Check name="checkbox" id="checkbox" defaultChecked />
                      <label htmlFor="checkbox">Me manter logado</label>
                    </div>
                    <button
                      className="btn btn-primary btn-block"
                      type="submit"
                      style={{ background: '#F4A460' }}
                    >
                      {loading ? (
                        <Animation
                          width={30}
                          height={30}
                          animation={loadingData}
                        />
                      ) : (
                        'Entrar'
                      )}
                    </button>
                  </Form>
                  <div className="text-center" style={{ marginTop: 20 }}>
                    <Link to="/dashboard" style={{ color: '#000' }}>
                      Esqueceu a senha?
                    </Link>
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
