import styled from 'styled-components';
import { shade } from 'polished';

// Cadastro Produto

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

  /* button {
    position: absolute;
    bottom: 25px;
    right: 40px;
    padding: 10px 20px 10px 20px;
    border-radius: 8px;
    border: 0;
    color: #fff;
    background: #f4a460;

    &:hover {
      background: ${shade(0.2, '#F4A460')};
    }
  } */
`;
