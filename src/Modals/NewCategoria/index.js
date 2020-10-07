/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { Input, Form, Select } from '@rocketseat/unform';
import { MdClose } from 'react-icons/md';
import { Modal, Button, Icon } from 'semantic-ui-react';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import api from '../../services/api';

import Avatar from './Image';
import { ModalArea, ButtonSalve } from './style';
import { resetUploads } from '../../store/modules/uploads/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  status: Yup.string().required('O status é obrigatório'),
});

export default function Neew() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const avatar = useSelector(state => state.uploads.avatar);

  async function handleSubmit(data) {
    setLoading(true);
    try {
      if (avatar === null) {
        toast.error('A imagem é obrigatória, favor verificar!');
        setLoading(false);
        return;
      }
      await api.post('categories', {
        ...data,
        image_id: avatar.id,
      });
      dispatch(resetUploads());
      setOpenModal(false);

      setLoading(false);
      toast.success('Categoria Cadastrado com sucesso');
    } catch (err) {
      if (err.response) {
        toast.error('Erro no servidor');
      } else {
        toast.error('Erro ao conectar com o servidor');
      }
    }
  }

  function handleCloseCreatCategoria() {
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
          onClick={handleCloseCreatCategoria}
        />
      </Modal.Header>
      <Form onSubmit={handleSubmit} schema={schema}>
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
            <ButtonSalve>
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
            </ButtonSalve>
          </div>
        </ModalArea>
      </Form>
    </Modal>
  );
}
