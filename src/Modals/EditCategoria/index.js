/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { Input, Form, Select } from '@rocketseat/unform';
import { MdClose } from 'react-icons/md';
import { Modal, Button, Icon } from 'semantic-ui-react';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import {
  editCategoriaRequest,
  editeCategoriaClose,
} from '../../store/modules/categorias/actions';
import Avatar from './Image';
import { ModalArea } from './style';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  status: Yup.string().required('O status é obrigatório'),
});

export default function Neew() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const category = useSelector(state => state.categorias.CategoriaToEdit);
  const openModal = useSelector(state => state.categorias.editCategoria);
  const avatar = useSelector(state => state.uploads.avatar);

  async function handleSubmitEdit(data) {
    const categoria = {
      ...data,
      id: category.id,
      avatar,
    };
    dispatch(editCategoriaRequest(categoria));
  }

  function handleCloseCreateProduct() {
    dispatch(editeCategoriaClose());
  }

  return (
    <Modal open={openModal} style={{ height: '60vh' }}>
      <Modal.Header style={{ background: '#F4A460', color: '#fff' }}>
        Editar categoria
        <MdClose
          style={{ float: 'right' }}
          onClick={handleCloseCreateProduct}
        />
      </Modal.Header>
      <Form onSubmit={handleSubmitEdit} initialData={category} schema={schema}>
        <ModalArea forR>
          <Avatar />
          <div>
            <div>
              <label>
                Nome da categoria <span style={{ color: 'red' }}>*</span>
              </label>
              <Input name="name" type="text" placeholder="NOME DO CATEGORIA" />
            </div>
            <div>
              <label>
                Status da categoria <span style={{ color: 'red' }}>*</span>
              </label>
              <Select
                placeholder="STATUS"
                style={{ border: '1px solid #999', height: 40 }}
                name="status"
                options={[
                  { id: 'ATIVO', title: 'ATIVO' },
                  { id: 'INATIVO', title: 'INATIVO' },
                ]}
              />
            </div>
          </div>

          {/* {loading ? (
            <Button
              loading
              type="submit"
              style={{
                position: 'absolute',
                width: 150,
                background: '#f4a460',
                color: '#fff',
              }}
            >
              Loading
            </Button>
          ) : ( */}
          <Button
            type="submit"
            style={{
              position: 'absolute',
              width: 150,
              background: '#f4a460',
              color: '#fff',
            }}
          >
            Salvar categoria
          </Button>
        </ModalArea>
      </Form>
    </Modal>
  );
}
