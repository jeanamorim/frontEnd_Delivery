import styled from 'styled-components';
import { shade } from 'polished';

export const InputContent = styled.div`
  position: absolute;
  display: flex;
  width: 600px;
  top: 75px;
  left: 185px;
  height: 40px;
`;

export const InputStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px 0 2px 2px;

  width: 100%;
  border-radius: 5px 0 0 5px;
  background: #f4a460;
  color: #fff;
  font-weight: bold;
  max-width: 550px;
  height: 40px;

  input {
    background: transparent;
    padding: 10px;
    border: 0;
    flex: 1;
    color: #fff;
    font-weight: bold;

    &::placeholder {
      color: rgba(255, 255, 255, 0.8);
    }
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f4a460;
    margin-left: 8px;
    height: 45px;
    width: 50px;
    border-radius: 8px;
    border: 0;

    &:hover {
      background: ${shade(0.2, '#F4A460')};
    }

    svg {
      color: #fff;
      font-size: 20px;
    }

    &:active {
      background: ${shade(0.2, '#F4A460')};
    }
  }
`;

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
      margin-bottom: 25px;
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

  button {
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
export const Container = styled.div`


  align-items: center;
  justify-content: center;
  left: 0;

  width: 70%;
  height: 100vh;
  background: #fff
  margin-top: 70px;
  border-color: #000;
  border-width: 2;
`;

export const Content = styled.div`
  width: 60%;
  height: 500px;
  background: #fff;
  padding: 20px;

  button {
    display: flex;
    justify-content: center;
    align-items: center;

    float: right;
    width: 40px;
    height: 40px;

    border-radius: 8px;
    border: 0;

    background: #f4a460;
    transition: 0.3s;

    svg {
      font-size: 20px;
      color: #fff;
    }

    &:hover {
      background: ${shade(0.2, '#F4A460')};
    }
  }

  input {
    width: 250px;
    height: 40px;

    padding: 10px;
    border-radius: 8px;
    border: 0;

    background: #f4a460;
    color: #fff;
  }
`;
