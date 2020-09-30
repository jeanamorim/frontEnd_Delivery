import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 900px) {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const Name = styled.div`
  display: flex;
  height: 60px;
  background: #e1dada;
  border-radius: 3px;
  margin-top: 10px;
  border-color: #000;
  border-width: 2px;
`;
