/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import api from '../../../services/api';

export default function EditarOpcao({ editar, setEditar, item }) {
  const [name, setName] = useState(item.name);
  const [minimo, setMinimo] = useState(item.minimo);
  const [maximo, setMaximo] = useState(item.maximo);

  const options = [
    { key: 'MAIOR VALOR', text: 'MAIOR VALOR', value: 'MAIOR VALOR' },
    { key: 'SOMA TOTAL', text: 'SOMA TOTAL', value: 'SOMA TOTAL' },
  ];

  async function editarVariacao() {
    try {
      await api.put(`variacao/${item.id}`, {
        name,
        minimo,
        maximo,
      });
      setEditar(false);
      toast.success('Variacao editada com sucesso');
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
      <Modal
        onClose={() => setEditar(false)}
        onOpen={() => setEditar(true)}
        open={editar}
      >
        <Modal.Header style={{ background: '#F4A460', color: '#fff' }}>
          Editar variação
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Nome"
                  placeholder="Nome"
                  name="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
                <Form.Input
                  fluid
                  value={minimo}
                  label="Qtd. Minimo"
                  placeholder="Preço"
                  name="price"
                  onChange={e => setMinimo(e.target.value)}
                />
                <Form.Input
                  fluid
                  value={maximo}
                  label="Qtd. Maximo"
                  placeholder="Preço"
                  name="price"
                  onChange={e => setMaximo(e.target.value)}
                />
                <Form.Select
                  fluid
                  label="logica"
                  options={options}
                  placeholder="Logica"
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
            onClick={() => editarVariacao()}
            positive
          />
        </Modal.Actions>
      </Modal>
    </>
  );
}
