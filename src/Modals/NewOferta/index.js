/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-use-before-define */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import { Input, Form, Select } from '@rocketseat/unform';
import { MdClose } from 'react-icons/md';
import { Modal, Button, Icon } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { formatPrice } from '../../util/format';
import { ModalArea, TwoInput, AutocompleteStyle } from './style';
import { postOfertaRequest } from '../../store/modules/ofertas/actions';
import { listProductsRequest } from '../../store/modules/product/actions';

const schema = Yup.object().shape({
  product_id: Yup.number()
    .typeError('Voce precisa selecionar um produto')
    .required('O produto é obrigatório'),
  unit: Yup.string().required('A unidade é obrigatória'),
  from: Yup.string()
    .matches(
      /^[+]?([.]\d+|\d+[.]?\d*)$/,
      'Insira um número válido. Ex: 3, 1.5, 0.46',
    )
    .required('O valor da oferta é obrigatório'),
  to: Yup.string()
    .matches(
      /^[+]?([.]\d+|\d+[.]?\d*)$/,
      'Insira um número válido. Ex: 3, 1.5, 0.46',
    )
    .required('O valor da oferta é obrigatório'),
  quantity: Yup.number()
    .typeError('O valor precisa ser um número')
    .positive('O número precisa ser maior que zero')
    .integer('O número precisa ser inteiro')
    .required('A expiração da oferta é obrigatória'),
  expires_in: Yup.number()
    .typeError('O valor precisa ser um número')
    .positive('O número precisa ser maior que zero')
    .integer('O número precisa ser inteiro')
    .required('A expiração da oferta é obrigatória'),
});

export default function Neew() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [nameProduct, setNameProduct] = useState('');
  const [ImageProduct, setImageProduct] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const products = useSelector(state => state.product.ListProducts);
  const [productInfo, setProductInfo] = useState({
    from: `${'R$'} 0`,
    fromUnformatted: 0,
    unit: 'KG',
  });

  useEffect(() => {
    dispatch(listProductsRequest());
  }, []);

  function handleChange(event) {
    const { price, unit, name, image } = products.find(product => {
      return product.id === Number(event.target.value);
    });

    setProductInfo({ from: formatPrice(price), fromUnformatted: price, unit });
    setNameProduct(name);
    setImageProduct(image.url);
  }

  async function handleSubmit(data) {
    const { unit, price } = products.find(product => {
      return product.id === data.product_id;
    });
    const offerData = {
      ...data,
      unit,
      from: price,
      to: Number(data.to),
      expires_in: Number(data.expires_in),
    };
    dispatch(postOfertaRequest(offerData));
    CloseModalResetInput();
  }

  const options = products.map(product => ({
    id: product.id,
    title: product.name,
  }));

  function CloseModalResetInput() {
    setOpenModal(false);
    setNameProduct('');
    setProductInfo({
      from: `${'R$'} 0`,
      fromUnformatted: 0,
      unit: 'kg',
    });
  }

  return (
    <Modal
      open={openModal}
      style={{ height: '60vh' }}
      trigger={
        <Button positive onClick={() => setOpenModal(true)}>
          <Icon name="plus" />
          Nova oferta
        </Button>
      }
    >
      <Modal.Header style={{ background: '#F4A460', color: '#fff' }}>
        {nameProduct === ''
          ? 'Cadastrar oferta'
          : `Oferta para o produto ${nameProduct}`}

        <MdClose style={{ float: 'right' }} onClick={CloseModalResetInput} />
      </Modal.Header>
      <Form onSubmit={handleSubmit} id="vd-form" schema={schema}>
        <ModalArea forR>
          {nameProduct === '' ? null : (
            <img
              style={{
                height: 150,
                width: 150,
                borderColor: 'red',
                borderWidth: 2,
              }}
              src={ImageProduct}
            />
          )}
          <div>
            <AutocompleteStyle>
              <div style={{ width: '50%' }}>
                <label>
                  Nome do produto <span style={{ color: 'red' }}>*</span>
                </label>
                <Select
                  onChange={handleChange}
                  name="product_id"
                  placeholder="SELECIONE O PRODUTO"
                  options={options}
                />
              </div>

              <div style={{ width: '50%', marginLeft: 5 }}>
                <label>
                  Unidade do produto <span style={{ color: 'red' }}>*</span>
                </label>
                <Select
                  disabled
                  value={productInfo.unit}
                  name="unit"
                  options={[
                    { id: 'kg', title: 'kg' },
                    { id: 'g', title: 'g' },
                    { id: 'dz', title: 'dz' },
                    { id: 'un', title: 'un' },
                    { id: '0', title: 'Nenhum' },
                  ]}
                />
              </div>
            </AutocompleteStyle>
            <TwoInput>
              <div style={{ width: '50%' }}>
                <label>
                  De <span style={{ color: 'red' }}>*</span>
                </label>
                <Input
                  disabled
                  value={productInfo.from}
                  type="text"
                  name="from-formatted"
                />
              </div>

              <Input
                type="hidden"
                value={productInfo.fromUnformatted}
                name="from"
              />
              <div style={{ width: '50%', marginLeft: 5 }}>
                <label>
                  Para <span style={{ color: 'red' }}>*</span>
                </label>
                <Input type="text" name="to" placeholder="PARA" />
              </div>
            </TwoInput>
            <TwoInput>
              <div style={{ width: '50%' }}>
                <label>
                  Quantidade <span style={{ color: 'red' }}>*</span>
                </label>
                <Input type="text" name="quantity" placeholder="QUANTIDADE" />
              </div>

              <div style={{ width: '50%', marginLeft: 5 }}>
                <label>
                  Expiração em dias <span style={{ color: 'red' }}>*</span>
                </label>
                <Input
                  type="text"
                  name="expires_in"
                  placeholder="EXPIRAÇÃO (em dias)"
                />
              </div>
            </TwoInput>
            <div
              style={{
                display: 'flex',
                right: 40,
                position: 'fixed',
                marginTop: 55,
                padding: 0,
                bottom: 25,
              }}
            >
              <Button
                negative
                onClick={() => setOpenModal(false)}
                style={{
                  width: 140,
                  border: 0,
                }}
              >
                Cancelar
              </Button>
              <Button
                positive
                type="submit"
                style={{
                  width: 140,
                  border: 0,
                }}
              >
                Salvar
              </Button>
            </div>
          </div>
        </ModalArea>
      </Form>
    </Modal>
  );
}
