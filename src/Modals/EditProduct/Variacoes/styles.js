import styled from 'styled-components';
import { shade } from 'polished';

export const VariacaoList = styled.div`
  display: flex;
  padding: 0px 0px 30px 10px;
  background: '#999';
  margin-bottom: 20px;
  margin-left: 17px;
  margin-right: 15px;

  > div {
    width: 100%;
    margin-left: 20px;
    justify-content: space-between;

    input {
      border-radius: 4px;
      border: 1px solid #f1eded;
      margin-bottom: 10px;
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
      border: 1px solid #f1eded;
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
export const Opcao = styled.div`
  display: flex;
  padding: 10px 30px 0px 10px;
  background: #f0efef;
  margin-bottom: 10px;
  margin-left: -35px;
  margin-right: 15px;
  margin-top: 10px;
  border-radius: 7px;
  border-color: #000;
  border-width: 5px;

  > div {
    width: 100%;
    margin-left: 20px;
    justify-content: space-between;

    input {
      border-radius: 4px;
      border: 1px solid #f1eded;
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

    select {
      border-radius: 4px;
      border: 1px solid #f1eded;
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
export const NovaOpcao = styled.div`
  display: flex;
  padding: 10px 30px 0px 10px;
  background: #f0efef;
  margin-bottom: 10px;
  margin-left: -35px;
  margin-right: 15px;
  margin-top: 10px;
  border-radius: 7px;
  border-color: #000;
  border-width: 5px;

  > div {
    width: 100%;
    margin-left: 20px;
    justify-content: space-between;

    input {
      border-radius: 4px;
      border: 1px solid #f1eded;
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

    select {
      border-radius: 4px;
      border: 1px solid #f1eded;
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
export const PageContent = styled.table`
  width: 100%;
  margin: 25px 0;
  border-collapse: collapse;
  th,
  td {
    padding: 6px;
    text-align: center;
    border-radius: 4px;
  }
  td {
    color: #4c4242;

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
    height: 50px;
    margin-top: 20px;
  }
`;
