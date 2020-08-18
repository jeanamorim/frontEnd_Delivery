import React, { useEffect, useState } from 'react';

import { toast } from 'react-toastify';

import Animation from '../../components/Animation';
import * as loadingData from '../../assets/animations/loading.json';

import api from '../../services/api';
import { formatCPF } from '../../util/format';

import Table from '../../components/Table';

export default function Users() {
  const [estabelecimento, setEstabelecimento] = useState();

  useEffect(() => {
    async function loadLojas() {
      try {
        const response = await api.get('/estabelecimento');

        setEstabelecimento(response.data);
      } catch (err) {
        if (err.response) {
          toast.error('Erro no servidor');
        } else {
          toast.error('Erro ao conectar com o servidor');
        }
      }
    }
    loadLojas();
  }, []);

  let data;

  if (estabelecimento) {
    data = estabelecimento.map(item => ({
      id: item.id,

      name: item.name,
      name_loja: item.name_loja,
      status: item.status,
      categoria: item.categoria,
      avaliacao: item.avaliacao,
      cpf: formatCPF(item.cpf),
    }));
  }

  const columns = [
    {
      label: 'Id da loja',
      field: 'id',
      sort: 'asc',
      width: 150,
    },
    {
      label: 'Nome da Loja',
      field: 'name_loja',
      sort: 'asc',
      width: 270,
    },
    {
      label: 'Nome do parceiro',
      field: 'name',
      sort: 'asc',
      width: 200,
    },
    {
      label: 'Status',
      field: 'status',
      sort: 'asc',
      width: 100,
    },
    {
      label: 'Categoria',
      field: 'categoria',
      sort: 'asc',
      width: 150,
    },
    {
      label: 'Avaliação',
      field: 'avaliacao',
      sort: 'asc',
      width: 100,
    },
    {
      label: 'CPF',
      field: 'cpf',
      sort: 'asc',
      width: 100,
    },
  ];

  const loading = <Animation width={30} height={30} animation={loadingData} />;

  const rows = [
    {
      id: loading,
      name: loading,
      email: loading,
      phone: loading,
      birthday: loading,
      cpf: loading,
    },
  ];

  return (
    <div className="content-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <h2 className="page-title">Lista de Parceiros</h2>
            <div className="panel panel-default">
              <div className="panel-heading">Informações</div>
              <div className="panel-body">
                <Table rows={data || rows} columns={columns} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
