import styled from 'styled-components';
import { shade } from 'polished';

// Cadastro Produto

export const ModalArea = styled.div`
  display: flex;
  padding: 40px 40px 80px 40px;

  @media only screen and (max-width: 450px) {
    display: grid;
    padding: opx;

    img {
      margin-left: 20%;
    }
    > div {
      display: grid;
      width: 100%;
    }
    input {
      border-radius: 4px;
      border: 1px solid #999999;
      margin-bottom: 15px;

      font-size: 15px;
    }
    select {
      flex: 1;
    }
  }

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
`;
export const ButtonSalve = styled.div`
  display: flex;
  right: 40px;
  position: fixed;
  margin-top: 55px;
  padding: 0px;
  bottom: 25px;

  @media only screen and (max-width: 350px) {
    flex-direction: column;
    display: block;
    right: 20px;
    position: fixed;
    padding: 0px;
    margin-left: 20%;
  }
`;
