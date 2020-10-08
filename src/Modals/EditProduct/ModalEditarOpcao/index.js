/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Button, Form, Modal, Header, Icon } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import api from '../../../services/api';

export default function EditarOpcao({ open, setOpen, item }) {
  const [value, setValue] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deletar, setDeletar] = useState(false);

  useEffect(() => setValue(item), [item]);

  function setVariacaoItemValue(field, valuee) {
    setValue({ ...value, [field]: valuee });
  }
  async function deletarOpcao() {
    setDeletar(true);
    try {
      await api.delete(`opcaovariacao/${item.id}`);

      toast.success('Opção deletada com sucesso');
      setOpenDelete(false);
      setOpen(false);
      setDeletar(false);
    } catch (err) {
      if (err.response) {
        toast.error('Erro no servidor');
      } else {
        toast.error('Erro ao conectar com o servidor');
      }
    }
  }

  async function editarOpção() {
    setLoading(true);
    try {
      await api.put(`opcaovariacao/${item.id}`, {
        name: value.name,
        price: value.price,
        status: value.status,
      });

      toast.success('Variacao editada com sucesso');
      setOpen(false);
      setLoading(false);
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
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
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
                  value={value.status}
                  label="Status"
                  options={options}
                  placeholder="Gender"
                  onChange={e => setVariacaoItemValue('status', e.target.value)}
                />
                {deletar ? (
                  <Button
                    negative
                    loading
                    style={{ height: 40, marginTop: 20 }}
                  >
                    loading
                  </Button>
                ) : (
                  <Button
                    negative
                    style={{ height: 40, marginTop: 20 }}
                    onClick={() => setOpenDelete(true)}
                  >
                    Deletar
                  </Button>
                )}
              </Form.Group>
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          {loading ? (
            <Button loading labelPosition="right" icon="checkmark" positive>
              loading
            </Button>
          ) : (
            <Button
              content="Salvar"
              labelPosition="right"
              icon="checkmark"
              onClick={() => editarOpção()}
              positive
            />
          )}
        </Modal.Actions>
      </Modal>
      <Modal
        closeIcon
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onOpen={() => setOpenDelete(true)}
      >
        <Header icon="archive" content="Deletar opção" />
        <Modal.Content>
          <p>Tem certeza que desejar deletar essa opção?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={() => setOpenDelete(false)}>
            <Icon name="remove" /> Não
          </Button>
          <Button color="green" onClick={() => deletarOpcao()}>
            <Icon name="checkmark" /> Sim
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}
