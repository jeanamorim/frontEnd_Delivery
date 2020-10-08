/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';

import { Button, Modal, Form, Message, Icon } from 'semantic-ui-react';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import api from '../../services/api';

import Imagem from './Image';
import { ModalArea, ButtonSalve } from './style';
import { resetUploads } from '../../store/modules/uploads/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  status: Yup.string().required('O status é obrigatório'),
});

export default function Neew() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [error, setError] = useState(false);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const avatar = useSelector(state => state.uploads.avatar);

  async function handleSubmit() {
    if (name === '') {
      setError(true);
      return;
    }
    if (avatar === null) {
      setError(true);
      return;
    }
    setLoading(true);
    try {
      await api.post('categories', {
        name,
        image_id: avatar.id,
      });
      dispatch(resetUploads());
      setOpen(false);

      setLoading(false);
      toast.success('Categoria Cadastrado com sucesso');
    } catch (err) {
      if (err.response) {
        toast.error('Erro no servidor');
      } else {
        toast.error('Erro ao conectar com o servidor');
      }
    }
  }
  const options = [
    { key: 'ATIVO', text: 'ATIVO', value: 'ATIVO' },
    { key: 'INATIVO', text: 'INATIVO', value: 'INATIVO' },
  ];

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button positive onClick={() => setOpen(true)}>
          <Icon name="plus" />
          Nova categoria
        </Button>
      }
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
              value={name}
              onChange={e => setName(e.target.value)}
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
        <Button color="black" onClick={() => setOpen(false)}>
          Cancelar
        </Button>

        <Button
          content="Salvar"
          labelPosition="right"
          icon="checkmark"
          positive
          onClick={handleSubmit}
        />
      </Modal.Actions>
    </Modal>
  );
}
