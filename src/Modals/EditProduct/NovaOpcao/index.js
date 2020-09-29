/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Input, Form, Select } from '@rocketseat/unform';
import { Button } from 'semantic-ui-react';

import { NovaOpcao } from './styles';

export default function NovaOp({
  novaOp,
  handleSubmitOpcao,
  name,
  price,
  status,
  setName,
  setPrice,
  setStatus,
  item,
}) {
  return (
    <>
      {novaOp ? (
        <NovaOpcao>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                display: 'flex',
                marginBottom: 6,
              }}
            >
              <div>
                <label>
                  Nome <span style={{ color: 'red' }}>*</span>
                </label>
                <Input
                  name="name"
                  type="text"
                  placeholder="NOME DA OPÇÃO"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div>
                <label>
                  Preço
                  <span style={{ color: 'red' }}>*</span>
                </label>
                <Input
                  name="price"
                  type="text"
                  placeholder="PREÇO"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                />
              </div>

              <div>
                <label>
                  Status <span style={{ color: 'red' }}>*</span>
                </label>
                <Select
                  placeholder="STATUS"
                  name="status"
                  options={[
                    { id: 'ATIVO', title: 'ATIVO' },
                    { id: 'INATIVO', title: 'INATIVO' },
                  ]}
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                />
              </div>

              <Button
                positive
                onClick={() => handleSubmitOpcao(name, price, status, item.id)}
                style={{
                  height: 39,
                  marginTop: 18,
                  marginLeft: 10,
                }}
              >
                Salvar
              </Button>
            </div>
          </div>
        </NovaOpcao>
      ) : null}
    </>
  );
}
