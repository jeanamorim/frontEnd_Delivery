/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import { Input, Form, Select } from '@rocketseat/unform';
import { MdClose } from 'react-icons/md';
import { Modal, Button, Header } from 'semantic-ui-react';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { ModalArea, TwoInput, AutocompleteStyle } from './style';

import {
  closeModalCadastarVariacao,
  openModalCadastarVariacao,
} from '../../store/modules/opcaoVariacao/actions';

export default function Neew() {
  const dispatch = useDispatch();
  const [newVariacao, setNewVariacao] = useState([]);
  const [products, setProducts] = useState([]);
  const openModal = useSelector(state => state.opcao.openModal);

  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await api.get('/productsList');
        setProducts(response.data);
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

  function fecharModal() {
    dispatch(closeModalCadastarVariacao());
  }
  function abrirModal() {
    dispatch(openModalCadastarVariacao());
  }
  const options = products.map(product => ({
    id: product.id,
    title: product.name,
  }));

  return (
    <>
      <Modal
        open={openModal}
        style={{}}
        trigger={
          <Button
            style={{ background: '#ff7f00', color: '#fff' }}
            onClick={() => abrirModal()}
          >
            Variação do produto
          </Button>
        }
      >
        <Modal.Header style={{ background: '#F4A460', color: '#fff' }}>
          Variação do produto
          <MdClose style={{ float: 'right' }} onClick={() => fecharModal()} />
        </Modal.Header>
        <Form>
          <ModalArea forR>
            <div>
              <label>
                Selecione o produto <span style={{ color: 'red' }}>*</span>
              </label>
              <Select
                name="product_id"
                placeholder="SELECIONE O PRODUTO"
                options={options}
              />
              {newVariacao.map((variacao, index) => {
                return (
                  <TwoInput>
                    <div style={{ width: '50%' }}>
                      <label>
                        Preço do produto <span style={{ color: 'red' }}>*</span>
                      </label>
                      <Input
                        name="name"
                        type="text"
                        placeholder=" R$ PREÇO DO PRODUTO"
                        value={variacao.name}
                        onChange={e =>
                          setNewVariacao(index, 'name', e.target.value)
                        }
                      />
                    </div>
                    <div style={{ width: '50%', marginLeft: 5 }}>
                      <label>
                        Quantidade do produto{' '}
                        <span style={{ color: 'red' }}>*</span>
                      </label>
                      <Input
                        name="minimo"
                        type="text"
                        placeholder="QUANTIDADE DISPONIVEL"
                        value={variacao.minimo}
                        onChange={e =>
                          setNewVariacao(index, 'minimo', e.target.value)
                        }
                      />
                    </div>
                    <div style={{ width: '50%', marginLeft: 5 }}>
                      <label>
                        Quantidade do produto{' '}
                        <span style={{ color: 'red' }}>*</span>
                      </label>
                      <Input
                        name="minimo"
                        type="text"
                        placeholder="QUANTIDADE DISPONIVEL"
                        value={variacao.minimo}
                        onChange={e =>
                          setNewVariacao(index, 'minimo', e.target.value)
                        }
                      />
                    </div>
                  </TwoInput>
                );
              })}
            </div>
          </ModalArea>
        </Form>
      </Modal>
    </>
  );
}
