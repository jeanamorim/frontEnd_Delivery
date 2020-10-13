/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Button, Form, Modal, Header, Icon } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import api from '../../../services/api';

export default function EditarOpcao({ editar, setEditar, item }) {
  const [value, setValue] = useState([]);
  const [status, setStatus] = useState();

  useEffect(() => (setValue(item), setStatus(item.status)), [item]);

  function setVariacaoItemValue(field, valuee) {
    setValue({ ...value, [field]: valuee });
  }
  const handleChange = (e, { value }) => setStatus(value);

  async function editarOpção() {
    try {
      await api.put(`opcaovariacao/${item.id}`, {
        name: value.name,
        price: value.price,
        status,
      });

      toast.success('Opção editada com sucesso');
      setEditar(false);
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
    <>
      <Modal
        onClose={() => setEditar(false)}
        onOpen={() => setEditar(true)}
        open={editar}
      >
        <Modal.Header>Editar opção</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Nome"
                  placeholder="Nome"
                  name="name"
                  value={value.name}
                  onChange={e => setVariacaoItemValue('name', e.target.value)}
                />
                <Form.Input
                  fluid
                  value={value.price}
                  label="Preço"
                  placeholder="Preço"
                  name="price"
                  onChange={e => setVariacaoItemValue('price', e.target.value)}
                />
                <Form.Select
                  fluid
                  value={status}
                  label="Status"
                  options={options}
                  placeholder="Status"
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setEditar(false)}>
            Cancelar
          </Button>

          <Button
            content="Editar"
            labelPosition="right"
            icon="checkmark"
            onClick={() => editarOpção()}
            positive
          />
        </Modal.Actions>
      </Modal>
    </>
  );
}
