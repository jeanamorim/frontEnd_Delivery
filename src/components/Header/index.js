/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';

import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../store/modules/auth/actions';

export default function Header() {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <div className="ui stackable menu">
      <div className="item">
        <img src={profile.image.url} className="Logo" alt="logo" />
      </div>

      <Link className="item" to="/">
        Home
      </Link>
      <Link className="item" to="/categoria">
        Produtos
      </Link>
      <Link className="item" to="/orders">
        Pedidos
      </Link>
      <Link className="item" to="/oferta">
        Ofertas
      </Link>

      <Link className="item" to="/analise">
        Análises
      </Link>
      <Link className="item" to="/entregas">
        Val. entregas
      </Link>
      <Link className="item" to="/pagamento">
        Pagamento
      </Link>
      <Link className="item" to="/horarios">
        Horários
      </Link>
      <Link className="item" to="/configuracao">
        Perfil
      </Link>
      <Link className="item" onClick={handleSignOut}>
        Sair
      </Link>
    </div>
  );
}
