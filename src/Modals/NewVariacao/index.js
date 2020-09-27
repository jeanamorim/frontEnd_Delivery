/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { Input, Form, Select } from '@rocketseat/unform';
import { MdClose } from 'react-icons/md';
import { Modal, Button, Icon, Header } from 'semantic-ui-react';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import { ModalArea, TwoInput, AutocompleteStyle } from './style';
import {
  closeEditProduct,
  updateProductRequest,
  deleteProductRequest,
} from '../../store/modules/product/actions';
import {
  closeModalCadastarVariacao,
  postVariacaoRequest,
} from '../../store/modules/variacao/actions';

export default function Neew({ idCat }) {
  const dispatch = useDispatch();
  const [newVariacao, setNewVariacao] = useState([]);
  const openModal = useSelector(state => state.variacao.openModal);

  function handleSubmit(data) {
    dispatch(postVariacaoRequest(data));
  }

  function handleCloseModal() {
    dispatch(closeModalCadastarVariacao());
  }
  function handleDeleteProduct(id) {
    dispatch(deleteProductRequest(id, idCat));
  }
  function addNewVariacao() {
    setNewVariacao([...newVariacao, { name: '', minimo: '', maximo: '' }]);
  }

  return (
    <>
      <Modal open={openModal} style={{}}>
        <Modal.Header style={{ background: '#F4A460', color: '#fff' }}>
          Variação
          <MdClose
            style={{ float: 'right' }}
            onClick={() => handleCloseModal()}
          />
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <ModalArea forR>
            <div>
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
