import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1000px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  align-self: center;
  align-items: center;

  ul {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 15px;
    margin-top: 10px;
  }

  @media only screen and (max-width: 1140px) {
    ul {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 15px;
      margin-top: 30px;
    }
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  align-items: center;

  div {
    color: #000;
    font-size: 25px;
    font-weight: bold;
  }
`;

export const Time = styled.li`
  padding: 12px;
  border-radius: 4px;
  background: #dcdcdc;
  display: flex;
  flex-direction: column;
  align-self: center;
  align-items: center;

  strong {
    display: block;
    color: #ff4500;
    font-size: 15px;
    font-weight: normal;
  }
  span {
    display: block;
    margin-top: 3px;
    color: #09a30c;
  }
`;
export const ContainerText = styled.div`
  padding: 15px;
  border-radius: 4px;
  background: #dcdcdc;
  display: flex;
`;
export const Text = styled.text`
  padding: 12px;

  display: flex;
  color: #000;
  font-weight: normal;
`;
