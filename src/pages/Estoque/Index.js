/* eslint-disable react/button-has-type */
import React from 'react';

import { MdSearch } from 'react-icons/md';

import { Modal, Dropdown } from 'semantic-ui-react';
import { Form, Input } from '@unform/web';

import {
  Container,
  Content,
  InputContent,
  ProductImage,
  List,
  Tbody,
  Thead,
  ThIMG,
  TdIMG,
  InputStyle,
  ModalArea,
  TwoInput,
  AutocompleteStyle,
  LoadingPage,
} from './styles';

import Avatar from './avatarStock';

const array = ['marcos', 'pedro', 'joao', 'mario', 'carlos'];

const stateOptions = array.map((state, index) => ({
  key: index,
  text: state,
  value: state,
}));
export default function Estoque() {
  function handleSearch(data) {}

  function handleSubmit(data) {}

  return (
    <>
      <Container>
        <Form onSubmit={handleSearch}>
          <InputContent>
            <InputStyle>
              <Input
                name="search"
                placeholder="CODIGO DE BARRAS, CODIGO DO PRODUTO, NOME DO PRODUTO"
                type="text"
              />
              <button type="submit">
                <MdSearch />
              </button>
            </InputStyle>
          </InputContent>
        </Form>

        <Modal trigger={<button>Novo produto</button>}>
          <Modal.Header>Cadastrar Produto</Modal.Header>
          <Form onSubmit={handleSubmit}>
            <ModalArea forR onSubmit={handleSubmit}>
              <Avatar />
              <div>
                <TwoInput>
                  <Input
                    name="barcode"
                    type="text"
                    placeholder="CODIGO DE BARRAS"
                    required
                  />
                  <Input
                    name="productCode"
                    type="text"
                    placeholder="CODIGO DO PRODUTO"
                    required
                  />
                </TwoInput>
                <input
                  name="productName"
                  type="text"
                  placeholder="NOME DO PRODUTO"
                />
                <TwoInput>
                  <Input
                    name="buyPrice"
                    type="text"
                    placeholder="VALOR DE CUSTO"
                  />
                  <Input
                    name="price"
                    type="text"
                    placeholder="VALOR DE VENDA"
                  />
                </TwoInput>

                <TwoInput>
                  <Input
                    name="quantityStock"
                    type="text"
                    placeholder="QUANTIDADE EM ESTOQUE"
                  />
                  <Input
                    name="minQuantityStock"
                    type="text"
                    placeholder="QUANTIDADE MINIMA"
                  />
                  <AutocompleteStyle>
                    <Dropdown
                      name="category"
                      style={{ border: '1px solid #999' }}
                      placeholder="CATEGORIA"
                      search
                      selection
                      options={stateOptions}
                    />
                  </AutocompleteStyle>
                </TwoInput>
              </div>
              <button type="submit">Salvar produto</button>
            </ModalArea>
          </Form>
        </Modal>
        <Content>
          <List>
            <Thead>
              <tr>
                <ThIMG />
                <th>COD. BARRAS</th>
                <th>COD. PRODUTO</th>
                <th>NOME DO PRODUTO</th>
                <th>QTD</th>
                <th>MEDIDA</th>
                <th>VALOR</th>
              </tr>
            </Thead>
            <Tbody>
              <tr>
                <TdIMG>
                  <img alt="" />
                </TdIMG>
                <td>ok</td>
                <td>ok</td>
                <td>ok</td>
                <td>ok</td>
                <td>Un</td>
                <td>ok</td>
              </tr>
            </Tbody>
          </List>
        </Content>
      </Container>
    </>
  );
}
