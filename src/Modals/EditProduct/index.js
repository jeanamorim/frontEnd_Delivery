/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { Input, Form, Select } from '@rocketseat/unform';
import { MdClose } from 'react-icons/md';
import { Modal, Button } from 'semantic-ui-react';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import translate from '../../locales';
import Avatar from './Image';
import {
  ModalArea,
  TwoInput,
  AutocompleteStyle,
  Delete,
  ButtonNo,
  ButtonYes,
} from './style';
import {
  closeEditProduct,
  updateProductRequest,
  deleteProductRequest,
} from '../../store/modules/product/actions';

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

export default function Neew({ idCat }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const product = useSelector(state => state.product.ProductToEdit);
  const openModal = useSelector(state => state.product.editProduct);
  const avatar = useSelector(state => state.uploads.avatar);
  const id = useSelector(state => state.product.ProductToEdit.id);
  const categorias = useSelector(state => state.categorias.Categorias);

  function handleSubmit(data) {
    dispatch(updateProductRequest(data, avatar, id, idCat));
  }

  const options = categorias.map(category => ({
    id: category.id,
    title: category.name,
  }));

  function handleCloseModal() {
    dispatch(closeEditProduct());
  }
  function handleDeleteProduct(id) {
    dispatch(deleteProductRequest(id, idCat));
    setOpenDeleteModal(false);
  }

  return (
    <>
      <Modal open={openModal}>
        <Modal.Header style={{ background: '#F4A460', color: '#fff' }}>
          Editar produto
          <MdClose
            style={{ float: 'right' }}
            onClick={() => handleCloseModal()}
          />
        </Modal.Header>
        <Form onSubmit={handleSubmit} initialData={product} schema={schema}>
          <ModalArea forR>
            <Avatar />
            <div>
              <Input
                name="name"
                type="text"
                placeholder="NOME DO PRODUTO"
                required
              />
              <Input
                name="description"
                type="text"
                placeholder="DESCRIÇÃO DO PRODUTO"
                required
              />
              <TwoInput>
                <Input
                  name="price"
                  type="text"
                  placeholder=" R$ PREÇO DO PRODUTO"
                  required
                />
                <Input
                  name="quantity"
                  type="text"
                  placeholder="QUANTIDADE DISPONIVEL"
                  required
                />
              </TwoInput>

              <AutocompleteStyle>
                <Select
                  name="unit"
                  placeholder="UNIDADE"
                  style={{
                    border: '1px solid #999',
                    width: '50%',
                    height: 40,
                  }}
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
            <div
              style={{
                position: 'absolute',
                marginTop: '33%',
                marginLeft: '0%',
                display: 'flex',
                color: 'red',
              }}
            >
              <MdClose onClick={() => setOpenDeleteModal(true)} />
              Deletar produto
            </div>
          </ModalArea>
        </Form>
      </Modal>
      {openDeleteModal && (
        <Delete>
          <div>
            <h2>
              Tem certeza que deseja deletar o produto{' '}
              {product.ProductToEdit.name} ?
            </h2>
            <div>
              <ButtonNo type="button" onClick={() => setOpenDeleteModal(false)}>
                Não
              </ButtonNo>
              <ButtonYes
                type="button"
                onClick={() => handleDeleteProduct(product.ProductToEdit.id)}
              >
                Sim
              </ButtonYes>
            </div>
          </div>
        </Delete>
      )}
    </>
  );
}
