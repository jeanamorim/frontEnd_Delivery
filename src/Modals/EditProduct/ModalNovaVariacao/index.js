/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import api from '../../../services/api';

export default function EditarOpcao({
  setNovaVariacao,
  novaVariacao,
  product,
  variacao,
}) {
  const [name, setName] = useState('');
  const [minimo, setMinimo] = useState('');
  const [maximo, setMaximo] = useState('');
  const [logica, setLogica] = useState('');
  const [loading, setLoading] = useState(false);

  async function cadastrarVariacao() {
    const idvar = variacao.map(function(item) {
      return item.id;
    });

    try {
      setLoading(true);
      const response = await api.post('variacao', {
        name,
        minimo,
        maximo,
        logica,
      });
      const ids = response.data.id;

      await api.put(`products/${product.id}`, {
        variacao: [...idvar, ids],
      });

      toast.success('Variacao cadastrada com sucesso');
      setLoading(false);
      setNovaVariacao(false);
    } catch (err) {
      if (err.response) {
        toast.error('Erro no servidor');
      } else {
        toast.error('Erro ao conectar com o servidor');
      }
    }
  }

  const options = [
    { key: 'MAIOR VALOR', text: 'MAIOR VALOR', value: 'MAIOR VALOR' },
    { key: 'SOMA TOTAL', text: 'SOMA TOTAL', value: 'SOMA TOTAL' },
  ];
  const handleChange = (e, { value }) => setLogica(value);

  return (
    <>
      <Modal
        onClose={() => setNovaVariacao(false)}
        onOpen={() => setNovaVariacao(true)}
        open={novaVariacao}
      >
        <Modal.Header>Nova variação</Modal.Header>
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
                  value={logica}
                  label="logica"
                  options={options}
                  placeholder="Logica"
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setNovaVariacao(false)}>
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
              onClick={() => cadastrarVariacao()}
              positive
            />
          )}
        </Modal.Actions>
      </Modal>
    </>
  );
}
