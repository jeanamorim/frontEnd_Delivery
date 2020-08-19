/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import { Input, Form, Select } from '@rocketseat/unform';
import { MdClose } from 'react-icons/md';
import { Modal, Button, Icon, Header, Divider } from 'semantic-ui-react';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import Avatar from './Image';
import { ModalArea, TwoInput, AutocompleteStyle } from './style';
import {
  closeEditProduct,
  updateProductRequest,
  deleteProductRequest,
} from '../../store/modules/product/actions';
import { openModalCadastarVariacao } from '../../store/modules/variacao/actions';

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

export default function Neew({ idCat }) {
  const dispatch = useDispatch();

  const [newOpcao, setNewOpcao] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [modalVariacao, setModalVariacao] = useState(false);
  const product = useSelector(state => state.product.ProductToEdit);
  const s = useSelector(state => state.product.ProductToEdit.variacao);
  const [newVariacao, setNewVariacao] = useState([]);
  const openModal = useSelector(state => state.product.editProduct);
  const avatar = useSelector(state => state.uploads.avatar);
  const id = useSelector(state => state.product.ProductToEdit.id);
  const categorias = useSelector(state => state.categorias.Categorias);

  // useEffect(() => {
  //   if (openModal === true) {
  //     console.log('true ele');
  //   }
  //   console.log('false ele');
  //   // setNewVariacao(product.variacao);
  // }, []);
  // useEffect(() => {
  //   txt1.current.focus();
  // }, []);
  console.log(newVariacao);
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
  function openModalVariacao() {
    setModalVariacao(true);
    setNewVariacao(product.variacao);
  }
  function handleDeleteProduct(id) {
    dispatch(deleteProductRequest(id, idCat));
    setOpenDeleteModal(false);
  }

  function addNewVariacao() {
    setNewVariacao([...newVariacao, { name: '', minimo: '', maximo: '' }]);
  }
  function addNewOpcao() {
    setNewOpcao([...newOpcao, { name: '', price: '', status: '' }]);
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

              <footer>
                <Button
                  content="cancelar"
                  labelPosition="right"
                  icon="times"
                  negative
                  style={{
                    width: 140,
                    border: 0,
                  }}
                  onClick={handleCloseModal}
                />
                <Button
                  type="submit"
                  content="Salvar"
                  labelPosition="right"
                  icon="checkmark"
                  positive
                  style={{
                    width: 140,
                    border: 0,
                  }}
                />
              </footer>
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
            <Button
              icon="clipboard outline"
              content="Variação"
              onClick={openModalVariacao}
            />
            <Button
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
      <>
        <Modal open={modalVariacao} style={{}}>
          <Modal.Header style={{ background: '#F4A460', color: '#fff' }}>
            Variação
            <MdClose
              style={{ float: 'right' }}
              onClick={() => setModalVariacao(false)}
            />
          </Modal.Header>
          <Form onSubmit={handleSubmit}>
            <ModalArea forR>
              <div>
                {newVariacao.map((variacao, index) => {
                  return (
                    <>
                      <TwoInput style={{ marginLeft: -50 }} key={variacao.id}>
                        <div style={{ width: '50%' }}>
                          <label>
                            Nome
                            <span style={{ color: 'red' }}>*</span>
                          </label>
                          <Input
                            name="name"
                            type="text"
                            placeholder="NOME"
                            value={variacao.name}
                            onChange={e =>
                              setNewVariacao(index, 'name', e.target.value)
                            }
                          />
                        </div>
                        <div style={{ width: '50%', marginLeft: 5 }}>
                          <label>
                            Mínimo
                            <span style={{ color: 'red' }}>*</span>
                          </label>
                          <Input
                            name="minimo"
                            type="text"
                            placeholder="MINÍMO"
                            value={variacao.minimo}
                            onChange={e =>
                              setNewVariacao(index, 'minimo', e.target.value)
                            }
                          />
                        </div>
                        <div style={{ width: '50%', marginLeft: 5 }}>
                          <label>
                            Maxímo
                            <span style={{ color: 'red' }}>*</span>
                          </label>
                          <Input
                            name="minimo"
                            type="text"
                            placeholder="MAXÍMO"
                            value={variacao.minimo}
                            onChange={e =>
                              setNewVariacao(index, 'minimo', e.target.value)
                            }
                          />
                        </div>
                        <div style={{ width: '50%', marginLeft: 5 }}>
                          <label>
                            Calculo do preço
                            <span style={{ color: 'red' }}>*</span>
                          </label>
                          <Select
                            placeholder="CALCULO"
                            name="calculoPrice"
                            options={[
                              { id: 'Soma total', title: 'Soma total' },
                              { id: 'Maior preço', title: 'Maior preço' },
                            ]}
                          />
                        </div>
                        <Button
                          negative
                          icon
                          style={{ height: 40, marginTop: 19, marginLeft: 15 }}
                        >
                          <Icon name="trash alternate outline" />
                        </Button>
                      </TwoInput>

                      {variacao.opcao.map((opcao, index) => {
                        return (
                          <>
                            <TwoInput>
                              <div style={{ width: '30%' }}>
                                <label>
                                  Name
                                  <span style={{ color: 'red' }}>*</span>
                                </label>
                                <Input
                                  name="name"
                                  type="text"
                                  placeholder="NAME"
                                  value={opcao.name}
                                  onChange={e =>
                                    setNewVariacao(
                                      index,
                                      'name',
                                      e.target.value,
                                    )
                                  }
                                />
                              </div>
                              <div style={{ width: '20%', marginLeft: 5 }}>
                                <label>
                                  Preço
                                  <span style={{ color: 'red' }}>*</span>
                                </label>
                                <Input
                                  name="price"
                                  type="text"
                                  placeholder="PRICE"
                                  value={opcao.price}
                                  onChange={e =>
                                    setNewVariacao(
                                      index,
                                      'price',
                                      e.target.value,
                                    )
                                  }
                                />
                              </div>
                              <div style={{ width: '20%', marginLeft: 5 }}>
                                <label>
                                  Status
                                  <span style={{ color: 'red' }}>*</span>
                                </label>
                                <Select
                                  placeholder="STATUS"
                                  name="status"
                                  value={opcao.status}
                                  onChange={e =>
                                    setNewVariacao(
                                      index,
                                      'status',
                                      e.target.value,
                                    )
                                  }
                                  options={[
                                    { id: 'ATIVO', title: 'ATIVO' },
                                    { id: 'INATIVO', title: 'INATIVO' },
                                  ]}
                                />
                              </div>
                            </TwoInput>
                          </>
                        );
                      })}

                      <Button
                        positive
                        onClick={addNewOpcao}
                        style={{ marginTop: -10 }}
                      >
                        <Icon name="plus" />
                        Nova opção
                      </Button>
                      <Divider />
                    </>
                  );
                })}
              </div>
            </ModalArea>
          </Form>
          <div
            style={{
              alignSelf: 'center',
              position: 'absolute',
              marginTop: -70,
              marginLeft: 5,
            }}
          >
            <Button positive onClick={addNewVariacao}>
              <Icon name="plus" />
              Nova variação
            </Button>
          </div>
        </Modal>
      </>
    </>
  );
}
