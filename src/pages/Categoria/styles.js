import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  ul {
    margin: 20px auto;

    list-style: none;
    display: grid;
    grid-gap: 20px;
    margin-bottom: 30px;
    grid-template-columns: repeat(6, 1fr);

    @media only screen and (max-width: 1200px) {
      margin: 20px auto;

      list-style: none;
      display: grid;
      grid-gap: 20px;
      margin-bottom: 30px;
      grid-template-columns: repeat(5, 1fr);
    }
    @media only screen and (max-width: 1100px) {
      margin: 20px auto;

      list-style: none;
      display: grid;
      grid-gap: 20px;
      margin-bottom: 20px;
      grid-template-columns: repeat(4, 1fr);
    }
    @media only screen and (max-width: 900px) {
      margin: 20px auto;

      list-style: none;
      display: grid;
      grid-gap: 20px;
      margin-bottom: 30px;
      grid-template-columns: repeat(3, 1fr);
    }
    @media only screen and (max-width: 800px) {
      margin: 20px auto;

      list-style: none;
      display: grid;
      grid-gap: 20px;
      margin-bottom: 30px;
      grid-template-columns: repeat(2, 1fr);
    }
    @media only screen and (max-width: 400px) {
      margin: 20px auto;

      list-style: none;
      display: grid;
      grid-gap: 20px;
      margin-bottom: 30px;
      grid-template-columns: repeat(1, 1fr);
    }
  }
`;
