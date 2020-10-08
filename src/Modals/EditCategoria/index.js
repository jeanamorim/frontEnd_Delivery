/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';

import { Button, Modal, Form, Message, Icon, Header } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { editeCategoriaClose } from '../../store/modules/categorias/actions';
import Imagem from './Image';

export default function Neew({ open, setOpen }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const category = useSelector(state => state.categorias.CategoriaToEdit);

  const avatar = useSelector(state => state.uploads.avatar);

  useEffect(() => setCategorias(category), [category]);

  const options = [
    { key: 'ATIVO', text: 'ATIVO', value: 'ATIVO' },
    { key: 'INATIVO', text: 'INATIVO', value: 'INATIVO' },
  ];

  async function handleSubmitEdit() {
    if (categorias.name === '') {
      setError(true);
      return;
    }

    try {
      setLoading(true);
      await api.put(`categories/${category.id}`, {
        name: categorias.name,
        image_id: avatar.id,
      });

      setOpen(false);
      toast.success('Categoria atualizado com sucesso');
      setLoading(false);
    } catch (err) {
      if (err.response) {
        toast.error('Erro no servidor');
      } else {
        toast.error('Falha ao conectar com o servidor');
      }
    }
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

  function setProdutosItens(field, value) {
    setCategorias({ ...categorias, [field]: value });
  }

  return (
    <>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
      >
        <Modal.Header style={{ background: '#F4A460', color: '#fff' }}>
          Editar categoria
        </Modal.Header>
        <Modal.Content image>
          <Imagem wrapped />
          <Modal.Description style={{ marginLeft: 30 }}>
            <Form error={error}>
              {error ? (
                <Message
                  error
                  header="Verifique os dados"
                  content="Um ou mais campos ficaram sem preencher, os campos * são obrigatórios"
                />
              ) : null}
              <Form.Input
                fluid
                label="Nome"
                placeholder="Nome"
                name="name"
                value={categorias.name}
                onChange={e => setProdutosItens('name', e.target.value)}
                required
              />

              <Form.Select
                fluid
                required
                label="Status"
                name="status"
                options={options}
                placeholder="Status"
              />
            </Form>
          </Modal.Description>
          <Modal.Content />
        </Modal.Content>
        <Modal.Actions>
          <Button
            content="Deletar"
            labelPosition="right"
            icon="delete"
            negative
            onClick={() => setOpenDeleteModal(true)}
          />
          <Button color="black" onClick={() => setOpen(false)}>
            Cancelar
          </Button>

          <Button
            content="Salvar"
            labelPosition="right"
            icon="checkmark"
            positive
            onClick={handleSubmitEdit}
          />
        </Modal.Actions>
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
