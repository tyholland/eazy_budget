import styled from "styled-components";
import { RUBIK } from "../../index.style.ts";

export const Wrapper = styled.div`
  display: flex;
  gap: 50px;
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
  align-items: center;
  margin: 0 auto;

  h2 {
    font-family: ${RUBIK};
  }
`;

export const SelectionWrapper = styled.div`
  display: flex;
  gap: 50px;
  align-items: center;
  justify-content: center;
`;

export const SectionWrapper = styled.div`
  display: flex;
  gap: 25px;
  flex-direction: column;
`;
