import styled from "styled-components";
import { BURGUNDY, OFF_WHITE, WHITE } from "../../index.style.ts";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${BURGUNDY};

  @media only screen and (max-width: 800px) {
    width: 100%;
  }
`;

export const Section = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  background: ${OFF_WHITE};
  padding-bottom: 20px;

  @media only screen and (max-width: 800px) {
    width: 100%;
  }

  h2 {
    width: 80%;
    margin: 0 auto;
    text-align: center;
  }

  &.phrase {
    padding: 20px 0;
    height: 130px;
    background: transparent;
    color: ${WHITE};
  }
`;
