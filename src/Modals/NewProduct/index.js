/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';

import { Button, Modal, Form, Message, Icon } from 'semantic-ui-react';

import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { resetUploads } from '../../store/modules/uploads/actions';
import api from '../../services/api';

import Imagem from './Image';

export default function Neew() {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [unit, setUnit] = useState('');
  const [category, setCategory] = useState();
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState([]);

  const avatar = useSelector(state => state.uploads.avatar);

  useEffect(() => {
    async function getCategoria() {
      try {
        const response = await api.get('/categories');
        setCategories(response.data);
      } catch (err) {
        if (err.response) {
          toast.error('Erro no servidor');
        } else {
          toast.error('Falha ao conectar com o servidor');
        }
      }
    }
    getCategoria();
  }, []);

  async function handleSubmit() {
    if (name === '') {
      setError(true);
      return;
    }
    if (price === '') {
      setError(true);
      return;
    }
    if (quantity === '') {
      setError(true);
      return;
    }
    if (unit === '') {
      setError(true);
      return;
    }
    if (description === '') {
      setError(true);
      return;
    }
    if (category === '') {
      setError(true);
      return;
    }
    if (avatar === null) {
      setError(true);
      return;
    }

    try {
      await api.post('products', {
        name,
        price,
        unit,
        description,
        category_id: category,
        quantity,
        image_id: avatar.id,
      });

      dispatch(resetUploads());
      setName('');
      setPrice('');
      setQuantity('');
      setUnit('');
      setDescription('');
      setCategory('');
      setError(false);
      setOpen(false);
      toast.success('Produto Cadastrado com sucesso');
    } catch (err) {
      if (err.response) {
        toast.error('Erro no servidor');
      } else {
        toast.error('Erro ao conectar com o servidor');
      }
    }
  }

  const options = categories.map(item => ({
    key: item.id,
    text: item.name,
    value: item.id,
  }));
  const unidade = [
    { key: 'kg', text: 'kg', value: 'kg' },
    { key: 'g', text: 'g', value: 'g' },
    { key: 'dz', text: 'dz', value: 'dz' },
    { key: 'un', text: 'un', value: 'un' },
    { key: 'Nenhum', text: 'Nenhum', value: 'Nenhum' },
  ];

  function handleAbrirModal() {
    setOpen(true);
    setError(false);
    dispatch(resetUploads());
  }
  function handleFecharModal() {
    setOpen(false);
    setError(false);
    dispatch(resetUploads());
  }

  const handleChangeUnit = (e, { value }) => setUnit(value);
  const handleChangeCategory = (e, { value }) => setCategory(value);

  return (
    <Modal
      onClose={() => handleFecharModal()}
      onOpen={() => handleAbrirModal()}
      open={open}
      trigger={
        <Button positive onClick={() => setOpen(true)}>
          <Icon name="plus" />
          Novo produto
        </Button>
      }
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
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="Preço"
                placeholder="Preço"
                name="price"
                value={price}
                onChange={e => setPrice(e.target.value)}
                required
                type="number"
              />
              <Form.Input
                fluid
                required
                label="Qtd. Produto"
                placeholder="Quantidade"
                name="quantity"
                type="number"
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Select
                fluid
                required
                label="Unidade"
                name="unit"
                options={unidade}
                placeholder="Unidade"
                value={unit}
                onChange={handleChangeUnit}
              />
              <Form.Select
                fluid
                required
                label="Categoria"
                name="category"
                options={options}
                placeholder="categoria"
                value={category}
                onChange={handleChangeCategory}
              />
            </Form.Group>
            <Form.TextArea
              label="Drecrição"
              required
              placeholder="Caracteristica do produto..."
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => handleFecharModal()}>
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
