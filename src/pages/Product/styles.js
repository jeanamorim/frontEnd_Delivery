import styled from 'styled-components';
import { darken, shade } from 'polished';

export const Container = styled.div`
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  max-width: 1250px;
  width: 100%;
`;

export const Title = styled.div`
  margin: 40px 0;
  strong {
    font-size: 20px;
    color: #444;
  }
  img {
    height: 55px;
    width: 55px;
    border-radius: 50%;
    border: 1px solid #000;
    margin-top: 4px;
    margin-right: 10px;
  }
  div {
    margin-left: 7px;
    color: #444;
  }
`;
export const PageActions = styled.div`
  display: flex;
  justify-content: space-between;
  div {
    align-items: center;
    justify-content: center;
    svg {
      position: absolute;
      margin-top: 9px;
      margin-left: 4px;
      color: #666;
    }
    input {
      height: 36px;
      width: 230px;
      padding-left: 30px;
      padding-right: 5px;
      color: #666;
      border: 1px solid #999;
      border-radius: 4px;
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
