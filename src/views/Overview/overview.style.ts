import styled from "styled-components";
import { BLACK, GRAY, LIGHT_GRAY, RUBIK, WHITE } from "../../index.style.ts";

export const OverviewWrapper = styled.div`
  display: flex;
  gap: 12px;
  flex-direction: column;
  background: ${WHITE};
  border-radius: 10px;
  padding: 0 20px 20px;
  box-shadow: -5px 5px 5px ${GRAY};

  @media only screen and (max-width: 800px) {
    gap: 25px;
    border: 1px solid ${LIGHT_GRAY};
    padding: 20px 10px;
    border-radius: 10px;
    background: ${WHITE};
  }

  .tooltip {
    width: 150px;
  }

  .inputWrapper {
    flex-direction: row;
    align-items: center;
  }
`;

export const Title = styled.h2`
  border-bottom: 1px solid ${BLACK};
  text-transform: capitalize;
  font-family: ${RUBIK};

  @media only screen and (max-width: 800px) {
    margin: 0;
  }
`;

export const Section = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media only screen and (max-width: 800px) {
    flex-direction: row-reverse;
    align-items: flex-start;
    justify-content: flex-end;
  }
`;
