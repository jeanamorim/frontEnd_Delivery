import styled from 'styled-components';

export const Containerr = styled.table`
  max-width: 1800px;
  margin: -7px auto;
  display: flex;
  flex-direction: column;

  background: #fff;
  border-width: 1px;
  border-style: solid;
  border-color: #ffd39b;


  header {

    display: flex;
    max-width: 1670px;
    margin: 10px auto;
    width: 100%;
    padding: 0px;
    font-size: 17px;

    div {
      margin-left: 100px;
      font-size: 15px;

    @media only screen and (max-width: 940px) {
           margin-left: 10px;
      }
}
      span {
        font-weight: bold;

      }
    }
  }
`;

export const ProductTable = styled.table`
  max-width: 1670px;
  margin: 10px auto;
  background: #f8f8ff;
  width: 60%;
  border-width: 1px;
  border-style: solid;
  border-color: #ffd39b;
  font-family: sans-serif;
  thead th {
    background: #f5f5f5;
    text-align: left;
    padding: 12px;
    border-bottom: 1px solid #999;
    font-family: sans-serif;
  }
  tbody td {
    background: #fff;
    padding: 1px;
    border-bottom: 1px solid #999;
    font-size: 14px;
    font-family: sans-serif;
  }
  img {
    height: 40px;
    width: 40px;
    border-radius: 50px;

    &:hover {
      -webkit-transform: scale(1.1);
      -moz-transform: scale(1.1);
      -o-transform: scale(1.1);
      -ms-transform: scale(1.1);
      transform: scale(1.1);
    }
  }

  span {
    display: block;
    margin-top: 5px;
    font-size: 20px;
    font-weight: bold;
    font-family: sans-serif;
  }
  footer {
    display: flex;
    max-width: 1670px;
    margin: 10px auto;
    width: 100%;
    padding: 40px;
    font-size: 20px;
    font-family: sans-serif;
    div {
      margin-left: 100px;
      font-size: 22px;
      font-family: Arial;
      font-family: sans-serif;
      span {
        margin-left: 10px;
        font-family: Arial;
        font-weight: bold;
        font-family: sans-serif;
      }
    }
  }
`;

export const Buttonn = styled.div`
  font-family: sans-serif;
  color: #000;
`;
export const Status = styled.div`
  display: flex;
  max-width: 1670px;
  margin: 10px auto;
  width: 100%;
  padding: 0px;
  font-size: 17px;

  button {
    margin-left: 540px;
    background: #ff7f00;
    color: #fff;
    font-weight: bold;
    font-family: sans-serif;

    @media only screen and (max-width: 868px) {
      margin-left: 0px;
      background: #ff7f00;
      color: #fff;
      font-weight: bold;
      font-family: sans-serif;
    }
  }
`;
