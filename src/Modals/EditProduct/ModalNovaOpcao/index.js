/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import api from '../../../services/api';

export default function EditarOpcao({
  newOpcao,
  setNewOpcao,
  idVariacao,
  variacao,
  setRender,
  render,
  setVisualizar,
}) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  async function cadastrarOpcao() {
    const newArray = variacao.filter(item => item.id === idVariacao);
    const newArray1 = newArray[0].opcao;
    const idOp = newArray1.map(function(item) {
      return item.id;
    });

    const data = {
      name,
      price,
      status,
    };
    try {
      setLoading(true);
      const response = await api.post('opcaovariacao', data);
      const ids = response.data.id;

      await api.put(`variacao/${idVariacao}`, {
        opcao: [...idOp, ids],
      });

      setName('');
      setPrice('');
      setStatus('');

      setRender(!render);
      setVisualizar(false);
      setLoading(false);
      setNewOpcao(false);
      toast.success('Opção cadastrada com sucesso');
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
  const handleChange = (e, { value }) => setStatus(value);

  return (
    <>
      <Modal
        onClose={() => setNewOpcao(false)}
        onOpen={() => setNewOpcao(true)}
        open={newOpcao}
      >
        <Modal.Header>Nova opção</Modal.Header>
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
                  value={price}
                  label="Preço"
                  placeholder="Preço"
                  name="price"
                  onChange={e => setPrice(e.target.value)}
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
          <Button color="black" onClick={() => setNewOpcao(false)}>
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
              onClick={() => cadastrarOpcao()}
              positive
            />
          )}
        </Modal.Actions>
      </Modal>
    </>
  );
}
