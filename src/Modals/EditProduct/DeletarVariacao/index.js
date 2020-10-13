/* eslint-disable react/prop-types */
import React from 'react';
import { Modal, Button, Icon, Header } from 'semantic-ui-react';
import { toast } from 'react-toastify';

import api from '../../../services/api';

export default function DeletarProduto({
  deletar,
  setDeletar,
  item,
  setRender,
  render,
}) {
  async function deletarVariação() {
    try {
      await api.delete(`variacao/${item}`);
      setDeletar(false);
      setRender(!render);
      toast.success('Variação deletada com sucesso');
    } catch (err) {
      if (err.response) {
        toast.error('Erro no servidor');
      } else {
        toast.error('Erro ao conectar com o servidor');
      }
    }
  }
  return (
    <Modal
      closeIcon
      onClose={() => setDeletar(false)}
      onOpen={() => setDeletar(true)}
      open={deletar}
    >
      <Header icon="archive" content="Deletar variação" />
      <Modal.Content>
        <p>Voçê tem certeza que deseja remover essa variação?</p>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={() => setDeletar(false)}>
          <Icon name="remove" /> Não
        </Button>
        <Button color="green" onClick={() => deletarVariação(item)}>
          <Icon name="checkmark" /> Sim
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
