import styled from 'styled-components';

export const Containerr = styled.table`
  max-width: 1300px;
  margin: 10px auto;
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  border-width: 1px;
  border-style: solid;
  border-color: #ffd39b;
`;

export const ProductTable = styled.table`
  margin: 50px auto;
  background: #f8f8ff;
  width: 100%;
  border-width: 1px;
  border-style: solid;
  border-color: #ffd39b;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  thead th {
    margin-top: 60px;
    color: #000;
    height: 50px;
    background: #f0e68c;
    text-align: left;
    padding: 10px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  tbody td {
    padding: 20px;
    border-bottom: 1px solid #999;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  span {
    display: block;
    margin-top: 200px;
    font-size: 19px;
    font-weight: bold;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;
