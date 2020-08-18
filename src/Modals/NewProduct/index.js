/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import { Input, Form, Select } from '@rocketseat/unform';
import { MdClose } from 'react-icons/md';
import { Modal, Button, Icon } from 'semantic-ui-react';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import translate from '../../locales';
import { postProductRequest } from '../../store/modules/product/actions';
import { getCategoriasRequest } from '../../store/modules/categorias/actions';
import Avatar from './Image';
import { ModalArea, TwoInput, AutocompleteStyle } from './style';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  category_id: Yup.string().required('A categoria é obrigatória'),
  description: Yup.string().required('A descrição é obrigatória'),
  quantity: Yup.string()
    .matches(/^[+]?([.]\d+|\d+[.]?\d*)$/, translate('product_quantity_error_1'))
    .required(translate('product_quantity_error_2')),
  unit: Yup.string().required(translate('product_unit_error')),
  price: Yup.string()
    .matches(/^[+]?([.]\d+|\d+[.]?\d*)$/, translate('product_price_error_1'))
    .required(translate('product_price_error_2')),
});

export default function Neew() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const categorias = useSelector(state => state.categorias.Categorias);
  const avatar = useSelector(state => state.uploads);

  useEffect(() => {
    dispatch(getCategoriasRequest());
  }, []);

  async function handleSubmit(data) {
    const product = {
      ...data,
      image_id: avatar.avatar.id,
    };

    dispatch(postProductRequest(product));
    setOpenModal(false);
  }

  const options = categorias.map(category => ({
    id: category.id,
    title: category.name,
  }));
  function handleCloseCreateProduct() {
    setOpenModal(false);
  }

  return (
    <Modal
      open={openModal}
      trigger={
        <Button positive onClick={() => setOpenModal(true)}>
          <Icon name="plus" />
          Novo produto
        </Button>
      }
    >
      <Modal.Header style={{ background: '#F4A460', color: '#fff' }}>
        Cadastrar produto
        <MdClose
          style={{ float: 'right' }}
          onClick={handleCloseCreateProduct}
        />
      </Modal.Header>
      <Form onSubmit={handleSubmit} schema={schema}>
        <ModalArea forR>
          <Avatar name="image_id" />
          <div>
            <Input name="name" type="text" placeholder="NOME DO PRODUTO" />
            <Input
              name="description"
              type="text"
              placeholder="DESCRIÇÃO DO PRODUTO"
            />
            <TwoInput>
              <Input
                name="price"
                type="text"
                placeholder=" R$ PREÇO DO PRODUTO"
              />
              <Input
                name="quantity"
                type="text"
                placeholder="QUANTIDADE DISPONIVEL"
              />
            </TwoInput>

            <AutocompleteStyle>
              <Select
                placeholder="UNIDADE"
                style={{ border: '1px solid #999', width: '50%', height: 40 }}
                name="unit"
                options={[
                  { id: 'kg', title: 'kg' },
                  { id: 'g', title: 'g' },
                  { id: 'dz', title: 'dz' },
                  { id: 'un', title: 'un' },
                  { id: '0', title: 'Nenhum' },
                ]}
              />

              <Select
                style={{ border: '1px solid #999', width: '50%' }}
                name="category_id"
                placeholder="CATEGORIA"
                options={options}
              />
            </AutocompleteStyle>
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
              Salvar produto
            </Button>
          )}
        </ModalArea>
      </Form>
    </Modal>
  );
}
