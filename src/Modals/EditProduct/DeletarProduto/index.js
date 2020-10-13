/* eslint-disable react/prop-types */
import React from 'react';
import { Modal, Button, Icon, Header } from 'semantic-ui-react';
import { toast } from 'react-toastify';

import api from '../../../services/api';

export default function DeletarProduto({
  setOpenDeleteModal,
  openDeleteModal,
  product,
  setOpen,
}) {
  async function handleDeleteProduct(id) {
    try {
      await api.delete(`products/${id}`);

      setOpenDeleteModal(false);
      setOpen(false);
      toast.success('Produto deletado com sucesso');
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
      onClose={() => setOpenDeleteModal(false)}
      onOpen={() => setOpenDeleteModal(true)}
      open={openDeleteModal}
    >
      <Header icon="archive" content="Deletar produto" />
      <Modal.Content>
        <p>Voçê tem certeza que deseja remover o produto {product.name}?</p>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={() => setOpenDeleteModal(false)}>
          <Icon name="remove" /> Não
        </Button>
        <Button color="green" onClick={() => handleDeleteProduct(product.id)}>
          <Icon name="checkmark" /> Sim
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
