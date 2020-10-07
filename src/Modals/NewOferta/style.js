import styled from 'styled-components';
import { shade } from 'polished';

export const ButtonSalve = styled.div`
  display: flex;
  right: 40px;
  position: fixed;
  margin-top: 55px;
  padding: 0px;
  bottom: 25px;

  @media only screen and (max-width: 570px) {
    flex-direction: column;
    display: block;
    right: 20px;
    position: fixed;
    padding: 0px;
    margin-left: 20%;
  }
`;

export const ModalArea = styled.div`
  display: flex;
  padding: 40px 40px 80px 40px;

  @media only screen and (max-width: 570px) {
    display: block;

    align-self: center;
    justify-content: center;
    align-items: center;
    img {
      align-self: center;
      align-items: center;
      justify-content: center;
      margin-left: 20%;
    }
    > div {
      margin-top: 20px;
      display: block;
      align-self: center;
      justify-content: center;
      align-items: center;
    }
    input {
      width: 100%;
      align-self: center;
      align-items: center;
      justify-content: center;
    }
  }

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
`;

export const TwoInput = styled.div`
  margin: 0;
  display: flex;
  width: 100%;
  @media only screen and (max-width: 570px) {
    display: block;
    align-self: center;
    align-items: center;
    justify-content: center;
    width: 100%;

    input {
      width: 100%;
      align-self: center;
      align-items: center;
      justify-content: center;
    }
  }

  input + input {
    margin-left: 25px;
  }
`;

export const AutocompleteStyle = styled.div`
  margin: 0;
  display: flex;
  width: 100%;
  @media only screen and (max-width: 570px) {
    display: block;
    align-self: center;
    align-items: center;
    justify-content: center;
    width: 100%;

    select {
      width: 100%;
      align-self: center;
      align-items: center;
      justify-content: center;
    }
  }

  select + select {
    margin-left: 25px;
  }
`;
