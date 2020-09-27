/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import { Input, Form, Select } from '@rocketseat/unform';
import { MdClose } from 'react-icons/md';
import { Modal, Button, Icon, Header } from 'semantic-ui-react';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import api from '../../services/api';

import Avatar from './Image';
import { ModalArea, TwoInput, AutocompleteStyle } from './style';

import { closeEditProduct } from '../../store/modules/product/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  category_id: Yup.string().required('A categoria é obrigatória'),
  description: Yup.string().required('A descrição é obrigatória'),
  quantity: Yup.string()
    .matches(/^[+]?([.]\d+|\d+[.]?\d*)$/, 'O valor precisa ser um número')
    .required('O número precisa ser maior que zero'),
  unit: Yup.string().required('A unidade é obrigatória'),
  price: Yup.string()
    .matches(
      /^[+]?([.]\d+|\d+[.]?\d*)$/,
      'Insira um número válido. Ex: 3, 1.5, 0.46',
    )
    .required('O preço é obrigatório'),
});
// const schemaVariacao = Yup.object().shape({
//   name: Yup.string().required('Obrigatório'),
//   calculoPrice: Yup.string().required('Obrigatório'),

//   minimo: Yup.string()
//     .matches(
//       /^[+]?([.]\d+|\d+[.]?\d*)$/,
//       'Insira um número válido. Ex: 3, 1.5, 0.46',
//     )
//     .required('Obrigatório'),
//   maximo: Yup.string()
//     .matches(
//       /^[+]?([.]\d+|\d+[.]?\d*)$/,
//       'Insira um número válido. Ex: 3, 1.5, 0.46',
//     )
//     .required('Obrigatório'),
// });

export default function Neew() {
  const dispatch = useDispatch();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const product = useSelector(state => state.product.ProductToEdit);
  const categories = useSelector(state => state.categorias.Categorias);
  const openModal = useSelector(state => state.product.editProduct);
  const avatar = useSelector(state => state.uploads.avatar);
  const id = useSelector(state => state.product.ProductToEdit.id);

  async function handleSubmit(data) {
    setLoading(true);
    try {
      await api.put(`products/${id}`, {
        ...data,
        image_id: avatar.id,
      });
      dispatch(closeEditProduct());
      setLoading(false);
      toast.success('Produto atualizado com sucesso');
    } catch (err) {
      if (err.response) {
        toast.error('Erro no servidor');
      } else {
        toast.error('Erro ao conectar com o servidor');
      }
    }
  }
  async function handleDeleteProduct(id) {
    try {
      await api.delete(`products/${id}`);
      dispatch(closeEditProduct());
      setOpenDeleteModal(false);
      toast.success('Produto deletado com sucesso');
    } catch (err) {
      if (err.response) {
        toast.error('Erro no servidor');
      } else {
        toast.error('Erro ao conectar com o servidor');
      }
    }
  }

  const options = categories.map(category => ({
    id: category.id,
    title: category.name,
  }));

  function handleCloseModal() {
    dispatch(closeEditProduct());
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
              <div>
                <label>
                  Nome do produto <span style={{ color: 'red' }}>*</span>
                </label>
                <Input name="name" type="text" placeholder="NOME DO PRODUTO" />
              </div>
              <label>
                Descrição do produto <span style={{ color: 'red' }}>*</span>
              </label>
              <Input
                name="description"
                type="text"
                placeholder="DESCRIÇÃO DO PRODUTO"
              />
              <TwoInput>
                <div style={{ width: '50%' }}>
                  <label>
                    Preço do produto <span style={{ color: 'red' }}>*</span>
                  </label>
                  <Input
                    name="price"
                    type="text"
                    placeholder=" R$ PREÇO DO PRODUTO"
                  />
                </div>
                <div style={{ width: '50%', marginLeft: 5 }}>
                  <label>
                    Quantidade do produto{' '}
                    <span style={{ color: 'red' }}>*</span>
                  </label>
                  <Input
                    name="quantity"
                    type="text"
                    placeholder="QUANTIDADE DISPONIVEL"
                  />
                </div>
              </TwoInput>

              <AutocompleteStyle>
                <div style={{ width: '50%' }}>
                  <label>
                    Unidade do produto <span style={{ color: 'red' }}>*</span>
                  </label>
                  <Select
                    placeholder="UNIDADE"
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
                <div style={{ width: '50%', marginLeft: 5 }}>
                  <label>
                    Categoria do produto <span style={{ color: 'red' }}>*</span>
                  </label>
                  <Select
                    name="category_id"
                    placeholder="CATEGORIA"
                    options={options}
                  />
                </div>
              </AutocompleteStyle>

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
                  onClick={handleCloseModal}
                  style={{
                    width: 140,
                    border: 0,
                  }}
                >
                  Cancelar
                </Button>
                {loading ? (
                  <Button
                    positive
                    loading
                    style={{
                      width: 140,
                      border: 0,
                    }}
                  >
                    Loading
                  </Button>
                ) : (
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
                )}
              </div>
            </div>
          </ModalArea>
        </Form>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            marginBottom: 40,
            marginLeft: 20,
          }}
        >
          <Button.Group vertical labeled icon>
            <Button icon="clipboard outline" content="Variação" />
            <Button
              negative
              icon="times"
              content="Deletar"
              onClick={() => setOpenDeleteModal(true)}
            />
          </Button.Group>
        </div>
      </Modal>

      <Modal
        closeIcon
        onClose={() => setOpenDeleteModal(false)}
        onOpen={() => setOpenDeleteModal(true)}
        open={openDeleteModal}
      >
        <Header icon="archive" content="Deletar produto" />
        <Modal.Content>
          <p>Voçê tem certeza que deseja remover o produto {product.name}?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={() => setOpenDeleteModal(false)}>
            <Icon name="remove" /> Não
          </Button>
          <Button color="green" onClick={() => handleDeleteProduct(product.id)}>
            <Icon name="checkmark" /> Sim
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}
