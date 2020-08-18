import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1000px;
  margin: 50px auto;

  display: flex;
  flex-direction: column;
  header {
    margin-top: 40px;
    display: flex;
    align-self: center;
    align-items: center;
    button {
      border: 0;
      background: none;
    }
    strong {
      color: #000000;
      font-size: 22px;
      margin: 0 15px;
    }
  }
  div {
    margin-top: 10px;
    display: flex;
    font-size: 20px;
  }
  ul {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 15px;
    margin-top: 30px;
  }

  @media only screen and (max-width: 700px) {
    ul {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 15px;
      margin-top: 30px;
    }
  }
`;

export const ProductTable = styled.table`
  margin: 10px auto;
  background: #dcdcdc;
  width: 110%;
  margin-left: -50px;
  border-width: 1px;
  border-style: solid;
  border-color: #9999;

  a {
    color: #ff4500;
  }
  a:hover {
    color: #ff0000;
  }
  thead th {
    background: #dcdcdc;
    text-align: left;
    padding: 10px;
    border-bottom: 1px solid #999;
  }
  tbody td {
    background: #fff;
    padding: 1px;
    border-bottom: 1px solid #999;
    font-size: 14px;
  }
  img {
    height: 40px;
    width: 40px;
    border-radius: 50px;
  }

  span {
    display: block;
    margin-top: 5px;
    font-size: 12px;
    font-weight: bold;
    font-family: helvetica;
  }
  footer {
    display: flex;
    max-width: 1670px;
    margin: 10px auto;
    width: 100%;
    padding: 40px;
    font-size: 20px;

    div {
      margin-left: 100px;
      font-size: 22px;

      span {
        margin-left: 10px;
        font-family: Arial;
        font-weight: bold;
      }
    }
  }
`;
