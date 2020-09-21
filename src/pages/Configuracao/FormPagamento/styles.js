import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1000px;
  margin: 10px auto;

  display: flex;
  flex-direction: column;

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

export const Time = styled.li`
  padding: 20px;
  border-radius: 4px;
  background: #dcdcdc;

  strong {
    display: block;
    color: #ff4500;
    font-size: 15px;
    font-weight: normal;
  }
  span {
    display: block;
    margin-top: 3px;
    color: #000;
  }
`;
