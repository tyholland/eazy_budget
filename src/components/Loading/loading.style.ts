import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;

  img {
    @media only screen and (max-width: 800px) {
      width: 100%;
      height: auto;
    }
  }
`;

export const Content = styled.div`
  font-weight: 500;
  font-size: 18px;
  max-width: 550px;
  width: 100%;
  text-align: center;
`;

export const Quote = styled.div`
  width: 400px;
  text-align: center;

  @media only screen and (max-width: 800px) {
    width: 100%;
  }
`;
