import styled from 'styled-components';
import { shade } from 'polished';

export const Variacoes = styled.div`
  display: flex;
  padding: 10px 40px 30px 10px;
  background: #e6dfdf;
  margin-left: 17px;
  margin-right: 15px;

  > div {
    width: 100%;
    margin-left: 20px;
    justify-content: space-between;

    input {
      border-radius: 4px;
      border: 1px solid #9999;
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
      border: 1px solid #9999;
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
