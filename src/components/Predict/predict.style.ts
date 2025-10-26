import styled from "styled-components";
import { ERROR_RED, WHITE } from "../../index.style.ts";

export const PredictWrapper = styled.div`
  display: flex;
  gap: 40px;
  flex-direction: column;

  @media only screen and (max-width: 800px) {
    gap: 20px;
  }
`;

export const PredictInputs = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;

  label {
    @media only screen and (max-width: 800px) {
      text-align: left;
    }
  }

  input {
    @media only screen and (max-width: 800px) {
      width: 130px;
    }
  }
`;

export const PredictBudgets = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;

  span {
    font-weight: 700;
  }
`;

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 18px;
  width: 100%;

  &.noCash {
    background: ${ERROR_RED};
    color: ${WHITE};
    border-radius: 10px;
    padding: 10px 15px;
    max-width: 500px;
    width: 100%;
    font-weight: 700;
  }
`;

export const CurrencyValue = styled.div`
  margin: 0 0 15px 160px;
  font-style: italic;
`;
