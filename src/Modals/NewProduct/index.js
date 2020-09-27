/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import { Input, Form, Select } from '@rocketseat/unform';
import { MdClose } from 'react-icons/md';
import { Modal, Button, Icon } from 'semantic-ui-react';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import translate from '../../locales';
import { resetUploads } from '../../store/modules/uploads/actions';
import api from '../../services/api';
import {
  openModalCadastarProduct,
  fecharModalCadastarProduct,
} from '../../store/modules/product/actions';

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
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const modal = useSelector(state => state.product.modalCadastrarProduct);

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

  async function handleSubmit(data) {
    setLoading(true);
    try {
      if (avatar === null) {
        toast.error('A imagem é obrigatória, favor verificar!');
        return;
      }
      await api.post('products', {
        ...data,
        image_id: avatar.id,
      });
      dispatch(fecharModalCadastarProduct());
      dispatch(resetUploads());
      setLoading(false);
      toast.success('Produto Cadastrado com sucesso');
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

  function handleAbrirModal() {
    dispatch(openModalCadastarProduct());
    dispatch(resetUploads());
  }
  function handleFecharModal() {
    dispatch(fecharModalCadastarProduct());
    dispatch(resetUploads());
  }

  return (
    <Modal
      open={modal}
      trigger={
        <Button positive onClick={() => handleAbrirModal()}>
          <Icon name="plus" />
          Novo produto
        </Button>
      }
    >
      <Modal.Header style={{ background: '#F4A460', color: '#fff' }}>
        Cadastrar produto
        <MdClose style={{ float: 'right' }} onClick={handleFecharModal} />
      </Modal.Header>
      <Form onSubmit={handleSubmit} schema={schema} className="form-horizontal">
        <ModalArea forR>
          <Avatar name="image_id" />

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
                  Quantidade do produto <span style={{ color: 'red' }}>*</span>
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
                onClick={handleFecharModal}
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
    </Modal>
  );
}
