import styled from 'styled-components';

export const Header = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;


  }
  div {
    margin-top: 10px;
    display: flex;
    font-size: 20px;
  }

`;

export const Container = styled.div`
  max-width: 50%;
  display: block;
  float: left;

  header {
    margin-top: 40px;
    display: flex;
    align-self: center;
    align-items: center;

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

  @media only screen and (max-width: 1250px) {
    ul {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 15px;
      margin-top: 30px;
    }
  }
  @media only screen and (max-width: 930px) {
    ul {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 15px;
      margin-top: 30px;
    }
  }
  @media only screen and (max-width: 700px) {
    ul {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      grid-gap: 15px;
      margin-top: 30px;
    }
  }
`;
export const ContainerAceito = styled.div`
  max-width: 50%;
  display: block;
  float: right;

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

  @media only screen and (max-width: 1250px) {
    ul {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 15px;
      margin-top: 30px;
    }
  }
  @media only screen and (max-width: 930px) {
    ul {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 15px;
      margin-top: 30px;
    }
  }
  @media only screen and (max-width: 700px) {
    ul {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      grid-gap: 15px;
      margin-top: 30px;
    }
  }
`;

export const Time = styled.li`
  padding: 20px;
  border-radius: 2px;
  background: #dcdcdc;
  display: flex;
  flex-direction: column;
  align-self: center;
  align-items: center;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50px;
  }

  strong {
    display: block;
    color: #ff4500;
    font-size: 17px;
    font-weight: normal;
  }
  span {
    display: block;
    margin-top: 3px;
    color: #000;
  }
`;
export const Content = styled.li`
  max-width: 900px;
  margin: 10px auto;
  display: flex;

  ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 15px;
    margin-top: -60px;

    li {
      padding: 60px;
      align-items: center;
      strong {
        display: block;
        color: #ff4500;
        font-size: 25px;

        font-weight: normal;
      }
      span {
        display: block;
        margin-top: 30px;
        font-size: 18px;
        color: #000;
      }
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
export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    margin: 0 10px 5px;
  }
  button {
    border: 0;
    background: none;
    &:disabled {
      opacity: 0;
    }
  }
`;
export const ContainerTable = styled.div`
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  max-width: 1250px;
  width: 100%;
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
    main {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  /*
  > td.status {
  } */
  tbody tr {
    background: #eeeae6;
    border: 0;
    height: 45px;
  }
`;
export const InfoHeader = styled.div`
  align-items: center;
  align-self: center;
`;
export const InfoText = styled.div`
  font-weight: bold;
`;
