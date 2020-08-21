import styled from 'styled-components';
import { shade } from 'polished';

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

export const Content = styled.div`
  width: 60%;
  height: 500px;
  background: #fff;
  padding: 20px;

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
export const Delete = styled.div`
  display: flex;
  position: absolute;
  right: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.2);
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  z-index: 99999;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 10px;

    width: 50%;
    height: 40%;

    background: #fff;

    div {
      display: flex;
      flex-direction: row;
    }

    img {
      position: absolute;
      right: 26%;
      bottom: 36%;
      width: 120px;
      height: auto;
      border-radius: 0;
      border: 0;
    }
  }

  @media (max-width: 1540px) {
    div {
      width: 60%;

      div {
        button {
          width: 130px;
          height: 50px;
        }
      }

      img {
        right: 22%;
      }
    }
  }
`;

export const ButtonYes = styled.button`
  background: #ff4848;
  transition: 0.3s;

  &:hover {
    background: ${shade(0.2, '#FF4848')};
    transition: 0.2s;
  }
`;

export const ButtonNo = styled.button`
  background: #777;
  transition: 0.3s;

  &:hover {
    background: ${shade(0.2, '#777')};
    transition: 0.2s;
  }
`;

export const PageContent = styled.table`
  width: 100%;
  margin: 25px 0;
  border-collapse: collapse;
  margin-left: -50px;
  th,
  td {
    padding: 6px;
    text-align: center;
    border-radius: 4px;
  }
  td {
    color: #666;
    main {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    img {
      height: 35px;
      width: 35px;
      border-radius: 50%;
      border: 1px solid #eee;
      margin-top: 4px;
      margin-right: 10px;
    }
  }
  /*
  > td.status {
  } */
  tbody tr {
    background: #eeeae6;
    border: 0;
  }
`;
export const Container = styled.div`
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  max-width: 1250px;
  width: 100%;
`;
