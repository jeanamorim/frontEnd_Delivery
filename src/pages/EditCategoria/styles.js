import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1000px;
  margin: -20px auto;
  display: flex;
  flex-direction: column;

  header {
    margin-top: 30px;
    display: flex;
    align-items: center;
    align-content: center;
    align-self: center;
    font-size: 30px;
    color: #1c1c1c;
  }

  a {
    color: #fff;
    font-size: 23px;

    &:hover {
      color: #ff4500;
    }
  }

  ul {
    margin: 20px auto;
    width: 100%;
    list-style: none;
    display: grid;
    grid-gap: 20px;
    margin-bottom: 30px;
    grid-template-columns: repeat(5, 1fr);

    @media only screen and (max-width: 1020px) {
      margin: 20px auto;
      width: 100%;
      list-style: none;
      display: grid;
      grid-gap: 20px;
      margin-bottom: 30px;
      grid-template-columns: repeat(4, 1fr);
    }

    li {
      display: flex;
      flex-direction: column;

      header {
        max-width: 250px;
        width: 100%;
        height: 90px;
        background-size: cover;
        border-radius: 4px;
        filter: brightness(32%);

        &:hover {
          -webkit-transform: scale(1.1);
          -moz-transform: scale(1.1);
          -o-transform: scale(1.1);
          -ms-transform: scale(1.1);
          transform: scale(1.1);
        }
      }
      strong {
        position: absolute;
        margin-top: 50px;
        align-items: center;
        color: #fff;
        font-size: 20px;
      }
    }
  }
`;
