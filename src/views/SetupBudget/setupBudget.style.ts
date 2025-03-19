import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  gap: 25px;
  flex-direction: column;
`;

export const Section = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;

  a {
    @media only screen and (max-width: 800px) {
      width: 80% !important;
      font-size: 18px;
    }
  }
`;

export const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 18px;
  gap: 25px;
  align-items: center;
  width: 345px;
  margin: 0 auto;
`;
