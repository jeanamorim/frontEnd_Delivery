/* eslint-disable no-sequences */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Modal, Form, Message } from 'semantic-ui-react';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import Imagem from '../Image';

function ModalExampleModal({ open, setOpen }) {
  const product = useSelector(state => state.product.ProductToEdit);
  const categories = useSelector(state => state.categorias.Categorias);
  const avatar = useSelector(state => state.uploads.avatar);
  const [categoria, setCategoria] = useState();
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => (setProdutos(product), setCategoria(product.category_id)), [
    product,
  ]);

  const options = [
    { key: 'kg', text: 'kg', value: 'kg' },
    { key: 'g', text: 'g', value: 'g' },
    { key: 'dz', text: 'dz', value: 'dz' },
    { key: 'un', text: 'un', value: 'un' },
    { key: 'Nenhum', text: 'Nenhum', value: 'Nenhum' },
  ];

  const Categorias = categories.map(item => ({
    key: item.id,
    text: item.name,
    value: item.id,
  }));

  function setProdutosItens(field, value) {
    setProdutos({ ...produtos, [field]: value });
  }
  const handleChangeUnit = (e, { value }) =>
    setProdutos({ ...produtos, unit: value });
  const handleChangeCategory = (e, { value }) => setCategoria(value);

  async function handleSubmit() {
    if (produtos.name === '') {
      setError(true);
      return;
    }
    if (produtos.price === '') {
      setError(true);
      return;
    }
    if (produtos.quantity === '') {
      setError(true);
      return;
    }
    if (produtos.unit === '') {
      setError(true);
      return;
    }
    if (produtos.description === '') {
      setError(true);
      return;
    }
    if (produtos.categoria === '') {
      setError(true);
      return;
    }

    setLoading(true);
    try {
      await api.put(`products/${product.id}`, {
        name: produtos.name,
        price: produtos.price,
        quantity: produtos.quantity,
        unit: produtos.unit,
        description: produtos.description,
        category_id: categoria,
        image_id: avatar.id,
      });

      toast.success('Produto atualizado com sucesso');
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

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header style={{ background: '#F4A460', color: '#fff' }}>
        Editar produto
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
              value={produtos.name}
              onChange={e => setProdutosItens('name', e.target.value)}
              required
            />
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="Preço"
                placeholder="Preço"
                name="price"
                value={produtos.price}
                onChange={e => setProdutosItens('price', e.target.value)}
                required
              />
              <Form.Input
                fluid
                required
                label="Qtd. Produto"
                placeholder="Quantidade"
                name="quantity"
                value={produtos.quantity}
                onChange={e => setProdutosItens('quantity', e.target.value)}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Select
                fluid
                required
                label="Unidade"
                name="unit"
                options={options}
                placeholder="Unidade"
                value={produtos.unit}
                onChange={handleChangeUnit}
              />
              <Form.Select
                fluid
                required
                label="Categoria"
                name="category"
                options={Categorias}
                placeholder="categoria"
                value={categoria}
                onChange={handleChangeCategory}
              />
            </Form.Group>
            <Form.TextArea
              label="Drecrição"
              required
              placeholder="Caracteristica do produto..."
              value={produtos.description}
              onChange={e => setProdutosItens('description', e.target.value)}
            />
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          Cancelar
        </Button>
        {loading ? (
          <Button
            loading
            labelPosition="right"
            icon="checkmark"
            positive
            style={{ width: 118 }}
          >
            loading
          </Button>
        ) : (
          <Button
            content="Salvar"
            labelPosition="right"
            icon="checkmark"
            positive
            onClick={handleSubmit}
          />
        )}
      </Modal.Actions>
    </Modal>
  );
}

export default ModalExampleModal;
