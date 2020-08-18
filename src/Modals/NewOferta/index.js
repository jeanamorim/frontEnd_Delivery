/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-use-before-define */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import { Input, Form, Select } from '@rocketseat/unform';
import { MdClose } from 'react-icons/md';
import { Modal, Button, Icon } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import api from '../../services/api';
import translate from '../../locales';
import { formatPrice } from '../../util/format';
import { ModalArea, TwoInput, AutocompleteStyle } from './style';
import { postOfertaRequest } from '../../store/modules/ofertas/actions';
import { listProductsRequest } from '../../store/modules/product/actions';

const schema = Yup.object().shape({
  product_id: Yup.number()
    .typeError(translate('offer_product_error_1'))
    .required(translate('offer_product_error_2')),
  unit: Yup.string().required(translate('offer_product_unit_error')),
  from: Yup.string()
    .matches(
      /^[+]?([.]\d+|\d+[.]?\d*)$/,
      translate('offer_product_from_error_1'),
    )
    .required(translate('offer_product_from_error_2')),
  to: Yup.string()
    .matches(/^[+]?([.]\d+|\d+[.]?\d*)$/, translate('offer_product_to_error_1'))
    .required(translate('offer_product_to_error_2')),
  quantity: Yup.number()
    .typeError(translate('offer_product_quantity_error_1'))
    .positive(translate('offer_product_quantity_error_2'))
    .integer(translate('offer_product_quantity_error_3'))
    .required(translate('offer_product_quantity_error_4')),
  expires_in: Yup.number()
    .typeError(translate('offer_product_expiration_error_1'))
    .positive(translate('offer_product_expiration_error_2'))
    .integer(translate('offer_product_expiration_error_3'))
    .required(translate('offer_product_expiration_error_4')),
});

export default function Neew() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [nameProduct, setNameProduct] = useState('');
  const [ImageProduct, setImageProduct] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const products = useSelector(state => state.product.ListProducts);
  const [productInfo, setProductInfo] = useState({
    from: `${translate('currency')} 0`,
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
      from: `${translate('currency')} 0`,
      fromUnformatted: 0,
      unit: 'kg',
    });
  }

  return (
    <Modal
      open={openModal}
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
              <Select
                onChange={handleChange}
                name="product_id"
                style={{ width: '50%' }}
                placeholder="SELECIONE O PRODUTO"
                options={options}
              />

              <Input
                style={{ width: '50%' }}
                disabled
                value={productInfo.unit}
                type="text"
                name="unit"
              />
            </AutocompleteStyle>
            <TwoInput>
              <Input
                disabled
                style={{ width: '50%' }}
                value={productInfo.from}
                type="text"
                name="from-formatted"
              />
              <Input
                type="hidden"
                value={productInfo.fromUnformatted}
                name="from"
              />
              <Input
                style={{ width: '50%' }}
                type="text"
                name="to"
                placeholder="PARA"
              />
            </TwoInput>
            <TwoInput>
              <Input
                type="text"
                name="quantity"
                style={{ width: '50%' }}
                placeholder="QUANTIDADE"
              />
              <Input
                style={{ width: '50%' }}
                type="text"
                name="expires_in"
                placeholder="EXPIRAÇÃO (em dias)"
              />
            </TwoInput>
          </div>

          {loading ? (
            <Button
              loading
              type="submit"
              style={{
                position: 'absolute',
                width: 140,
                background: '#f4a460',
                color: '#fff',
              }}
            >
              Loading
            </Button>
          ) : (
            <Button
              type="submit"
              style={{
                position: 'absolute',
                width: 140,
                background: '#f4a460',
                color: '#fff',
              }}
            >
              Criar oferta
            </Button>
          )}
        </ModalArea>
      </Form>
    </Modal>
  );
}
