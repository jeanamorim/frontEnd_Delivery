import React from 'react';
import { Link } from 'react-router-dom';

import { Wrapper, ErrorContainer } from './styles';

export default function Error404() {
  return (
    <Wrapper>
      <ErrorContainer>
        <div>
          <h1>Oops!</h1>
          <h2>Entre em contato com nosso suporte</h2>
        </div>
        <Link to="/">Voltar para o início</Link>
      </ErrorContainer>
    </Wrapper>
  );
}
