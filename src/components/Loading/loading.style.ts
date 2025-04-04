import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;

export const Content = styled.div`
  font-weight: 700;
  font-size: 18px;
`;

export const Quote = styled.div`
  width: 400px;
  text-align: center;

  @media only screen and (max-width: 800px) {
    width: 100%;
  }
`;
