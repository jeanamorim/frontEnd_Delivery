/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Input, Form, Select } from '@rocketseat/unform';
import { Button } from 'semantic-ui-react';

import { Variacoes } from './styles';

export default function NovaVariacao({
  novaVari,
  schemaVariacao,
  handleSubmitVariacao,
  loadingPostVar,
}) {
  return (
    <>
      {novaVari ? (
        <Form
          id="vd-form"
          schemaVariacao={schemaVariacao}
          onSubmit={handleSubmitVariacao}
        >
          <Variacoes>
            <div
              style={{
                display: 'flex',
              }}
            >
              <div>
                <label>
                  Nome <span style={{ color: 'red' }}>*</span>
                </label>
                <Input name="name" type="text" placeholder="NOME" />
              </div>
              <div>
                <label>
                  Quant. Mínima
                  <span style={{ color: 'red' }}>*</span>
                </label>
                <Input name="minimo" type="text" placeholder="QUANT. MÍNIMA" />
              </div>
              <div>
                <label>
                  Quant. Máxima
                  <span style={{ color: 'red' }}>*</span>
                </label>
                <Input name="maximo" type="text" placeholder="QUANT. MÁXIMA" />
              </div>
              <div>
                <label>
                  Logica <span style={{ color: 'red' }}>*</span>
                </label>
                <Select
                  placeholder="LOGICA"
                  name="calculoPrice"
                  options={[
                    { id: 'MAIOR VALOR', title: 'MAIOR VALOR' },
                    { id: 'SOMA TOTAL', title: 'SOMA TOTAL' },
                  ]}
                />
              </div>
              <div>
                {loadingPostVar ? (
                  <Button
                    type="submit"
                    positive
                    loading
                    style={{
                      border: 0,
                      width: 110,
                      height: 40,
                      marginTop: 18,
                      marginLeft: 10,
                    }}
                  >
                    loading
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    positive
                    style={{
                      border: 0,
                      width: 110,
                      height: 40,
                      marginTop: 18,
                      marginLeft: 10,
                    }}
                  >
                    Cadastrar
                  </Button>
                )}
              </div>
            </div>
          </Variacoes>
        </Form>
      ) : null}
    </>
  );
}
