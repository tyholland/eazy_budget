import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;

  h2 {
    @media only screen and (max-width: 800px) {
      font-size: 18px;
    }
  }
`;

export const Section = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  a {
    @media only screen and (max-width: 800px) {
      width: 80% !important;
      font-size: 18px;
    }
  }
`;
