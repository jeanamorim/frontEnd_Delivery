import styled from 'styled-components';

export const Buttonn = styled.div`
  header {
    button {
      background-color: #32cd32;

      &:hover {
        background-color: #32cd32;
        color: #fff;
        -webkit-transform: scale(1.1);
        -moz-transform: scale(1.1);
        -o-transform: scale(1.1);
        -ms-transform: scale(1.1);
        transform: scale(1.1);
      }
    }
  }
`;

export const Variacao = styled.div`
  header {
    text-align: center;
    button {
      float: right;
      background-color: #ff8c00;

      &:hover {
        background-color: #ff4500;
        color: #fff;
        -webkit-transform: scale(1.1);
        -moz-transform: scale(1.1);
        -o-transform: scale(1.1);
        -ms-transform: scale(1.1);
        transform: scale(1.1);
      }
    }
  }
`;
export const Opcao = styled.div`
  position: relative;
  header {
    text-align: center;
    float: right;
    button {
      background-color: #ff8c00;

      &:hover {
        background-color: #ff4500;
        color: #fff;
        -webkit-transform: scale(1.1);
        -moz-transform: scale(1.1);
        -o-transform: scale(1.1);
        -ms-transform: scale(1.1);
        transform: scale(1.1);
      }
    }
  }
`;
export const ButtonAdicionar = styled.div`
  font-size: 19px;
  margin: 20px auto;
  font-family: courier, arial, helvetica;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 50%;
  height: 90px;

  a {
    padding: 6px;

    button {
      background-color: #ff8c00;
      border-radius: 4px;
      height: 40px;
      width: 150px;
      font-size: 12px;
      color: #fff;
      -webkit-font-smoothing: antialiased !important;
      font-family: courier, arial, helvetica;

      &:hover {
        -webkit-transform: scale(1.1);
        -moz-transform: scale(1.1);
        -o-transform: scale(1.1);
        -ms-transform: scale(1.1);
        transform: scale(1.1);
      }
    }
  }
`;
