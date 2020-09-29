import styled from 'styled-components';
import { shade } from 'polished';

export const ModalArea = styled.div`
  display: flex;
  padding: 40px 40px 80px 40px;

  > div {
    display: block;
    width: 100%;
    margin-left: 40px;

    input {
      border-radius: 4px;
      border: 1px solid #999999;
      margin-bottom: 15px;
      padding: 15px;
      height: 40px;
      width: 100%;
      font-size: 15px;

      &::placeholder {
        color: #999;
        font-size: 14px;
        font-family: 'Square721 BT', serif;
      }
    }
    span {
      color: #f64c75;
      margin: 50px 0 0;

      margin-bottom: 20px;
      align-self: flex-start;
      font-weight: bold;
    }
    footer {
      float: right;
      margin-top: 50px;
    }
    select {
      border-radius: 4px;
      border: 1px solid #999999;
      margin-bottom: 25px;
      padding: 10px;
      height: 40px;
      width: 100%;
      font-size: 15px;
      background: #fff;

      &::placeholder {
        color: #999;
        font-size: 14px;
        font-family: 'Square721 BT', serif;
      }
    }
  }
`;

export const TwoInput = styled.div`
  margin: 0;
  display: flex;
  width: 100%;

  input + input {
    margin-left: 25px;
  }
`;

export const AutocompleteStyle = styled.div`
  margin: 0;
  display: flex;
  width: 100%;

  select + select {
    margin-left: 25px;
  }
`;

// Fim Cadastro Produto
