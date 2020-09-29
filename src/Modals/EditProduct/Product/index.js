/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Input, Form, Select } from '@rocketseat/unform';
import { Button } from 'semantic-ui-react';
import Avatar from '../Image';
import { ModalArea, TwoInput, AutocompleteStyle } from './styles';

export default function Product({
  handleSubmit,
  product,
  schema,
  options,
  loading,
  handleCloseModal,
}) {
  return (
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
              marginTop: 35,
              float: 'right',
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
  );
}
