/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { Input, Form, Select } from '@rocketseat/unform';
import { MdClose } from 'react-icons/md';
import { Modal, Button, Icon, Header } from 'semantic-ui-react';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { editeCategoriaClose } from '../../store/modules/categorias/actions';
import Avatar from './Image';
import { ModalArea } from './style';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  status: Yup.string().required('O status é obrigatório'),
});

export default function Neew() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const category = useSelector(state => state.categorias.CategoriaToEdit);
  const openModal = useSelector(state => state.categorias.editCategoria);
  const avatar = useSelector(state => state.uploads.avatar);
  // const loading = useSelector(state => state.categorias.loading);

  async function handleSubmitEdit(data) {
    setLoading(true);
    const { id } = category;
    const categoria = {
      name: data.name,
      image_id: avatar.id,
    };

    try {
      await api.put(`categories/${id}`, categoria);
      setLoading(false);
      dispatch(editeCategoriaClose());
      toast.success('Categoria atualizado com sucesso');
    } catch (err) {
      if (err.response) {
        toast.error('Erro no servidor');
        setLoading(false);
      } else {
        toast.error('Falha ao conectar com o servidor');
        setLoading(false);
      }
    }
  }

  function handleCloseCreateProduct() {
    dispatch(editeCategoriaClose());
  }
  async function deleteCategoria(id) {
    try {
      await api.delete(`categories/${id}`);
      setOpenDeleteModal(false);
      dispatch(editeCategoriaClose());

      toast.success('Categoria deletada com sucesso');
    } catch (err) {
      if (err.response) {
        toast.error('Erro no servidor');
      } else {
        toast.error('Erro ao conectar com o servidor');
      }
    }
  }

  return (
    <>
      <Modal open={openModal}>
        <Modal.Header style={{ background: '#F4A460', color: '#fff' }}>
          Editar categoria
          <MdClose
            style={{ float: 'right' }}
            onClick={handleCloseCreateProduct}
          />
        </Modal.Header>
        <Form
          onSubmit={handleSubmitEdit}
          initialData={category}
          schema={schema}
        >
          <ModalArea>
            <Avatar />
            <div>
              <div>
                <label>
                  Nome da categoria <span style={{ color: 'red' }}>*</span>
                </label>
                <Input
                  name="name"
                  type="text"
                  placeholder="NOME DO CATEGORIA"
                />
              </div>
              <div>
                <label>
                  Status da categoria <span style={{ color: 'red' }}>*</span>
                </label>
                <Select
                  placeholder="STATUS"
                  style={{ border: '1px solid #999', height: 40 }}
                  name="status"
                  options={[
                    { id: 'ATIVO', title: 'ATIVO' },
                    { id: 'INATIVO', title: 'INATIVO' },
                  ]}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  right: 40,
                  position: 'fixed',
                  marginTop: 55,
                  padding: 0,
                  bottom: 25,
                }}
              >
                <Button
                  negative
                  onClick={handleCloseCreateProduct}
                  style={{
                    width: 140,
                    border: 0,
                  }}
                >
                  Cancelar
                </Button>
                {loading ? (
                  <Button
                    positive
                    loading
                    style={{
                      width: 140,
                      border: 0,
                    }}
                  >
                    Loading
                  </Button>
                ) : (
                  <Button
                    positive
                    type="submit"
                    style={{
                      width: 140,
                      border: 0,
                    }}
                  >
                    Salvar
                  </Button>
                )}
              </div>
            </div>
          </ModalArea>
        </Form>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            marginBottom: 40,
            marginLeft: 20,
          }}
        >
          <Button.Group vertical labeled icon>
            <Button
              negative
              icon="times"
              content="Deletar"
              onClick={() => setOpenDeleteModal(true)}
            />
          </Button.Group>
        </div>
      </Modal>

      <Modal
        closeIcon
        onClose={() => setOpenDeleteModal(false)}
        onOpen={() => setOpenDeleteModal(true)}
        open={openDeleteModal}
      >
        <Header icon="archive" content="Deletar produto" />
        <Modal.Content>
          <p>
            Voçê tem certeza que deseja remover a categoria {category.name}?
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={() => setOpenDeleteModal(false)}>
            <Icon name="remove" /> Não
          </Button>
          <Button color="green" onClick={() => deleteCategoria(category.id)}>
            <Icon name="checkmark" /> Sim
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}
