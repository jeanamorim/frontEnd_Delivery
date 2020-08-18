/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import { Input, Form, Select } from '@rocketseat/unform';
import { MdClose } from 'react-icons/md';
import { Modal, Button, Container } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import api from '../../../services/api';

import Animation from '../../../components/Animation';
import * as loadingData from '../../../assets/animations/loading.json';
import Avatar from './avatarStock';
import { ModalArea, TwoInput, AutocompleteStyle } from './styles';

export default function Neew() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const avatar = useSelector(state => state.uploads);

  const loadingAnimation = (
    <Animation width={30} height={30} animation={loadingData} />
  );

  async function handleSubmit(data) {
    setLoading(true);

    try {
      await api.post('/products', {
        ...data,
        image_id: avatar.avatar.id,
      });

      toast.success('Produto adicionado com sucesso');
      setLoading(false);
      setOpenModal(false);
    } catch (err) {
      if (err.response) {
        toast.error('Erro no servidor');
        setLoading(false);
      } else {
        toast.error('Erro ao conectar com o servidor');
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await api.get('/categories');

        setCategorias(response.data);
      } catch (err) {
        if (err.response) {
          toast.error('Erro no servidor');
        } else {
          toast.error('Erro ao conectar com o servidor');
        }
      }
    }

    loadCategories();
  }, []);

  const options = categorias.map(category => ({
    id: category.id,
    title: category.name,
  }));
  function handleCloseCreateProduct() {
    setOpenModal(false);
  }

  return (
    <Container style={{ background: '#000', marginLeft: 500 }}>
      <Modal
        open={openModal}
        trigger={
          <button onClick={() => setOpenModal(true)}>Novo produto</button>
        }
      >
        <Modal.Header style={{ background: '#F4A460', color: '#fff' }}>
          Cadastrar produto
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
    </Container>
  );
}
