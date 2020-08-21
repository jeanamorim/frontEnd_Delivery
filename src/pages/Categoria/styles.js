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
