/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';

import { Input, Button, Label, Icon } from 'semantic-ui-react';
import { Container, Time } from './styles';

export default function FormPagamento() {
  return (
    <div className="content-wrapper" style={{ marginTop: 40 }}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-12">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <Button>
                      <Icon name="sync" /> Atualizar
                    </Button>
                  </div>
                  <div className="content-wrapper">
                    <div className="panel-body">
                      <Container>
                        <ul>
                          <Time>
                            <strong>ADEMAR DE CARVALHO</strong>
                            <Input label="R$" placeholder="valor" />
                          </Time>
                          <Time>
                            <strong>ADEMAR DE CARVALHO</strong>
                            <Input label="R$" placeholder="valor" />
                          </Time>
                          <Time>
                            <strong>ADEMAR DE CARVALHO</strong>
                            <Input label="R$" placeholder="valor" />
                          </Time>
                          <Time>
                            <strong>ADEMAR DE CARVALHO</strong>
                            <Input label="R$" placeholder="valor" />
                          </Time>
                        </ul>
                      </Container>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
