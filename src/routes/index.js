import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';

import Dashboard from '../pages/Dashboard';
import AddAdmin from '../pages/AddAdmin';
import Orders from '../pages/Orders';
import Order from '../pages/Order';

import Profile from '../pages/Profile';

import Banners from '../pages/Banners';
import Estabelecimento from '../pages/Estabelecimento';
import Settings from '../pages/Settings';
import EstabelecimentoAdd from '../pages/AddEstabelecimentos';
import categorias from '../pages/Categoria';
import AddCategorias from '../pages/AddCategoria';
import EditCategoria from '../pages/EditCategoria';
import Produto from '../pages/Product';
import AddProdutos from '../pages/AddProdutos';
import EditProduct from '../pages/EditProducts';
import AddOfertas from '../pages/AddOfertas';
import Ofertas from '../pages/Ofertas';
import Opcao from '../pages/EditOpcao';

import EditVariacao from '../pages/EditVariacao';
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

      {/* <Route path="/admin" exact component={Admin} isPrivate /> */}
      <Route path="/admin/add" component={AddAdmin} isPrivate />

      <Route path="/profile" component={Profile} isPrivate />

      <Route path="/banners" exact component={Banners} isPrivate />
      <Route path="/banners/add" component={Banners} isPrivate />

      <Route path="/orders" component={Orders} isPrivate />
      <Route path="/order" component={Order} isPrivate />

      <Route path="/categoria" component={categorias} isPrivate />
      <Route path="/categorias" component={AddCategorias} isPrivate />
      <Route path="/editCategoria" component={EditCategoria} isPrivate />

      <Route path="/produto" component={Produto} isPrivate />
      <Route path="/produtos" component={AddProdutos} isPrivate />
      <Route path="/editProduct" component={EditProduct} isPrivate />

      <Route path="/oferta" component={Ofertas} isPrivate />
      <Route path="/ofertas" component={AddOfertas} isPrivate />

      <Route path="/analise" component={Analises} isPrivate />

      <Route path="/Editopcao" component={Opcao} isPrivate />

      <Route path="/editVariacao" component={EditVariacao} isPrivate />

      <Route path="/lista" component={ListaPedidos} isPrivate />
      <Route path="/configuracao" component={Configuração} isPrivate />
      <Route path="/entregas" component={Valoresentregas} isPrivate />
      <Route path="/pagamento" component={Pagamento} isPrivate />
      <Route path="/horarios" component={Horarios} isPrivate />

      <Route
        path="/estabelecimentos"
        component={EstabelecimentoAdd}
        isPrivate
      />
      <Route path="/estabelecimento" component={Estabelecimento} isPrivate />

      <Route path="/settings" component={Settings} isPrivate />

      <Route path="*" component={Error404} />
    </Switch>
  );
}
