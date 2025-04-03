import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 500px;
  margin: 8% auto 0;

  @media only screen and (max-width: 800px) {
    width: 100%;
  }
`;

export const Section = styled.div`
  display: flex;
  align-items: center;
  height: 130px;

  @media only screen and (max-width: 800px) {
    width: 100%;
  }
`;
