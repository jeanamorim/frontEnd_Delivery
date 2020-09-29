/* eslint-disable react/prop-types */
import React from 'react';
import { Modal, Button, Icon, Header } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import api from '../../../services/api';
import { closeEditProduct } from '../../../store/modules/product/actions';

export default function DeletarProduto({
  setOpenDeleteModal,
  openDeleteModal,
  product,
}) {
  const dispatch = useDispatch();
  async function handleDeleteProduct(id) {
    try {
      await api.delete(`products/${id}`);
      dispatch(closeEditProduct());
      setOpenDeleteModal(false);
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
