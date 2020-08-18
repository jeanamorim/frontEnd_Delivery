/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { Input, Form, Select } from '@rocketseat/unform';
import { MdClose } from 'react-icons/md';
import { Modal, Button, Icon } from 'semantic-ui-react';

import { useSelector, useDispatch } from 'react-redux';

import { postCategoriaRequest } from '../../store/modules/categorias/actions';
import Avatar from './Image';
import { ModalArea } from './style';

export default function Neew() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const avatar = useSelector(state => state.uploads);

  async function handleSubmit(data) {
    const categoria = {
      ...data,
      image_id: avatar.avatar.id,
    };
    dispatch(postCategoriaRequest(categoria));
    setOpenModal(false);
  }

  function handleCloseCreateProduct() {
    setOpenModal(false);
  }

  return (
    <Modal
      open={openModal}
      trigger={
        <Button positive onClick={() => setOpenModal(true)}>
          <Icon name="plus" />
          Nova categoria
        </Button>
      }
    >
      <Modal.Header style={{ background: '#F4A460', color: '#fff' }}>
        Cadastrar categoria
        <MdClose
          style={{ float: 'right' }}
          onClick={handleCloseCreateProduct}
        />
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <ModalArea forR>
          <Avatar />
          <div>
            <Input
              name="name"
              type="text"
              placeholder="NOME DO CATEGORIA"
              required
            />
            <Select
              placeholder="STATUS"
              style={{ border: '1px solid #999', height: 40 }}
              name="unit"
              options={[
                { id: 'ATIVO', title: 'ATIVO' },
                { id: 'INATIVO', title: 'INATIVO' },
              ]}
            />
          </div>

          {loading ? (
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
          ) : (
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
          )}
        </ModalArea>
      </Form>
    </Modal>
  );
}
