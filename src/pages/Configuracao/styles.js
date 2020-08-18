import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 800px;
  margin: 50px auto;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      background: #f5deb3;
      border: 0;
      border-radius: 2px;
      height: 44px;
      padding: 0 15px;
      color: #000000;
      margin: 0 0 10px;

      &::placeholder {
        color: #696969;
      }
    }

    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    hr {
      border: 0px;
      height: 1px;
      background: rgba(255, 255, 255, 0.2);
      margin: 10px 0 20px;
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: #ff4500;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 2px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#FF0000')};
      }
    }
  }

  > button {
    width: 100%;
    margin: 5px 0 0;
    height: 44px;
    background: #ff0000;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.08, '#FF0000')};
    }
  }
`;
