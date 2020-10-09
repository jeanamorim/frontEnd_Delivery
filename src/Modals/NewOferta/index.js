/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-use-before-define */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';

import { Button, Modal, Form, Message, Icon } from 'semantic-ui-react';

import { toast } from 'react-toastify';
import { formatPrice } from '../../util/format';

import api from '../../services/api';

export default function Neew() {
  const [product_id, setProduct_id] = useState();
  const [price_, setPrice] = useState();
  const [unit_, setUnit] = useState();
  const [quantity, setQuantity] = useState();
  const [to, setTo] = useState();
  const [expirin, setExpirin] = useState();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [nameProduct, setNameProduct] = useState('');
  const [ImageProduct, setImageProduct] = useState('');

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await api.get('/productsList');
        setProducts(response.data);
      } catch (err) {
        if (err.response) {
          toast.error('Erro, verifique sua conexão com a internet');
        } else {
          toast.error('Erro, verifique sua conexão com a internet');
        }
      }
    }

    loadProducts();
  }, []);
  const handleChange = (e, { value }) => {
    const { price, unit, name, image, id } = products.find(product => {
      return product.id === value;
    });

    setNameProduct(name);
    setImageProduct(image.url);
    setProduct_id(id);
    setPrice(formatPrice(price));
    setUnit(unit);
  };

  async function handleSubmit() {
    if (to === '') {
      setError(true);
      return;
    }
    if (quantity === '') {
      setError(true);
      return;
    }
    if (expirin === '') {
      setError(true);
      return;
    }
    const offerData = {
      product_id,
      quantity,
      unit: unit_,
      from: price_,
      to,
      expires_in: expirin,
    };
    try {
      await api.post('/offers', offerData);
      setOpen(false);
      toast.success('Oferta cadastrada com sucesso');
    } catch (err) {
      if (err.response) {
        toast.error('Erro, verifique sua conexão com a internet');
      } else {
        toast.error('Erro, verifique sua conexão com a internet');
      }
    }
  }
  // offers
  const options = products.map(item => ({
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
    setProduct_id('');
    setUnit('');
    setPrice('');
    setUnit('');
    setImageProduct(null);
    setExpirin('');
    setTo('');
    setNameProduct('');
    setError(false);
  }
  function handleFecharModal() {
    setOpen(false);
    setProduct_id('');
    setUnit('');
    setPrice('');
    setUnit('');
    setImageProduct(null);
    setExpirin('');
    setTo('');
    setNameProduct('');
    setError(false);
  }

  return (
    <Modal
      onClose={() => handleFecharModal()}
      onOpen={() => handleAbrirModal()}
      open={open}
      trigger={
        <Button positive onClick={() => setOpen(true)}>
          <Icon name="plus" />
          Nova oferta
        </Button>
      }
    >
      <Modal.Header style={{ background: '#F4A460', color: '#fff' }}>
        {nameProduct === ''
          ? 'Cadastrar oferta'
          : `Oferta para o produto ${nameProduct}`}
      </Modal.Header>
      <Modal.Content image>
        {nameProduct === '' ? null : (
          <img
            style={{
              height: 100,
              width: 100,
              borderColor: 'red',
              borderWidth: 2,
              borderRadius: 70,
            }}
            src={ImageProduct}
          />
        )}
        <Modal.Description style={{ marginLeft: 30 }}>
          <Form error={error}>
            {error ? (
              <Message
                error
                header="Verifique os dados"
                content="Um ou mais campos ficaram sem preencher, os campos * são obrigatórios"
              />
            ) : null}

            <Form.Group widths="equal">
              <Form.Select
                fluid
                name="product_id"
                label="Selecione o produto"
                options={options}
                placeholder="Produto"
                onChange={handleChange}
              />

              <Form.Select
                fluid
                required
                label="Unidade"
                name="unit"
                options={unidade}
                placeholder="Unidade"
                value={unit_}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                required
                label="De"
                placeholder="De"
                name="from"
                value={price_}
              />
              <Form.Input
                fluid
                required
                label="Para"
                placeholder="Para"
                name="to"
                type="number"
                onChange={e => setTo(e.target.value)}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                required
                label="Qtd. Produto"
                placeholder="Quantidade"
                name="quantity"
                type="number"
                onChange={e => setQuantity(e.target.value)}
              />
              <Form.Input
                fluid
                required
                type="number"
                label="Expiração(em dias)"
                placeholder="Expiração em dias"
                name="expirin_in"
                onChange={e => setExpirin(e.target.value)}
              />
            </Form.Group>
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
