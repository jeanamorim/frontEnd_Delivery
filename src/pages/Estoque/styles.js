import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  margin-top: 55px;
  margin-left: 110px;
  height: 95vh;
  background: #999999;

  > button {
    position: absolute;
    display: flex;
    top: 75px;
    right: 30px;
    align-items: center;
    justify-content: center;

    width: 100%;
    border-radius: 10px;
    border: 0;
    background: #715ac1a5;
    color: #fff;
    font-weight: bold;
    max-width: 150px;
    height: 40px;

    &:hover {
      background: #715ac1;
    }
  }
`;

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
  background: #715ac1a5;
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
    background: #715ac1;
    margin-left: 8px;
    height: 45px;
    width: 50px;
    border-radius: 8px;
    border: 0;

    &:hover {
      background: ${shade(0.2, '#715ac1')};
    }

    svg {
      color: #fff;
      font-size: 20px;
    }

    &:active {
      background: ${shade(0.2, '#715ac1')};
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
  }

  button {
    position: absolute;
    bottom: 25px;
    right: 40px;
    padding: 10px 20px 10px 20px;
    border-radius: 8px;
    border: 0;
    color: #fff;
    background: #715ac1a5;

    &:hover {
      background: ${shade(0.2, '#715ac1a5')};
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
  > div {
    display: flex;
    width: 80%;
    height: 40px;
    margin-left: 10px;
  }
`;

// Fim Cadastro Produto

export const Content = styled.div`
  background: #fff;
  display: flex;
  height: 95vh;
  padding: 70px 30px 30px;
  width: 100%;

  input {
    height: 50px;
  }
`;

export const ProductImage = styled.input`
  border-radius: 50%;
  border: 5px solid #715ac1;
  max-width: 140px;
  max-height: 140px;
  width: 100%;
  height: 140px;
  margin-right: 40px;
`;

export const List = styled.table`
  width: 100%;
  background: white;
`;

export const Thead = styled.thead`
  background: #715ac1;
  color: #fff;
  font-weight: bold;
  font-size: 17px;
  font-family: 'Square721 BT', serif;
  tr {
    th {
      height: 50px;
      text-align: center;
    }
  }
`;

export const ThIMG = styled.th`
  background: #fff;
`;

export const TdIMG = styled.td`
  background: #fff;
  height: 40px;
  width: 40px;
  max-width: 40px;
  max-height: 40px;

  img {
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 40px;
    max-height: 30px;
    max-width: 30px;
    margin-left: -5px;
  }
`;

export const LoadingPage = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  font-size: 250px;
`;

export const Tbody = styled.tbody`
  background: #715ac1aa;
  font-family: Arial, Helvetica, sans-serif;

  tr {
    td {
      height: 40px;
      max-height: 40px;
      font-size: 15px;
      font-weight: 500;
      text-align: center;
    }
  }
`;
