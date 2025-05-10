import styled from "styled-components";
import { RUBIK } from "../../index.style.ts";

export const YearlylyWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin: 30px 0;

  @media only screen and (max-width: 800px) {
    flex-direction: column;
  }

  .tooltip {
    width: 150px;
  }
`;

export const Title = styled.h2`
  text-transform: capitalize;
  margin: 0;
  font-family: ${RUBIK};
`;

export const ItemWrapper = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: space-between;
  height: 300px;
  flex-direction: column;

  @media only screen and (max-width: 800px) {
    width: 90%;
    gap: 20px;
    height: auto;
    margin: 0 auto;
  }

  .itemWrapper {
    flex-direction: row;
    align-items: center;
    border: 0;
    padding: 0;
    background: transparent;

    @media only screen and (max-width: 800px) {
      width: 100%;
    }
  }

  .inputWrapper {
    flex-direction: row;
    align-items: center;
  }
`;

export const ContentWrapper = styled.div`
  width: 85%;
  display: flex;
  gap: 20px;
  flex-direction: column;

  @media only screen and (max-width: 800px) {
    width: 100%;
  }
`;
