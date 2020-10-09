import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';

import Dashboard from '../pages/Dashboard';

import Orders from '../pages/Orders';
import Order from '../pages/Order';

import categorias from '../pages/Categoria';

import Produto from '../pages/Product';

import Ofertas from '../pages/Ofertas';

import ListaPedidos from '../pages/ListaPedidos';
import Analises from '../pages/Analises';
import Configuração from '../pages/Configuracao';
import Valoresentregas from '../pages/Configuracao/Valoresentregas';
import Pagamento from '../pages/Configuracao/FormPagamento';
import Horarios from '../pages/Configuracao/HorFuncionamento';

import Error404 from '../pages/Error404';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/home" component={Dashboard} isPrivate />

      <Route path="/orders" component={Orders} isPrivate />
      <Route path="/order" component={Order} isPrivate />

      <Route path="/categoria" component={categorias} isPrivate />

      <Route path="/produto" component={Produto} isPrivate />

      <Route path="/oferta" component={Ofertas} isPrivate />

      <Route path="/analise" component={Analises} isPrivate />

      <Route path="/lista" component={ListaPedidos} isPrivate />
      <Route path="/configuracao" component={Configuração} isPrivate />
      <Route path="/entregas" component={Valoresentregas} isPrivate />
      <Route path="/pagamento" component={Pagamento} isPrivate />
      <Route path="/horarios" component={Horarios} isPrivate />

      <Route path="*" component={Error404} />
    </Switch>
  );
}
