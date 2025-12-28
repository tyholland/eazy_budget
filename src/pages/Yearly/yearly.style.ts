import styled from "styled-components";
import { BLACK, GRAY, LIGHT_GRAY, RUBIK, WHITE } from "../../index.style.ts";

export const YearlylyWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin: 30px 0;
  flex-direction: column;

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
  justify-content: space-between;
  flex-direction: column;

  .itemWrapper {
    box-shadow: none;

    .inputWrapper {
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }
  }

  a {
    background: ${WHITE} !important;
    border-radius: 10px !important;
    box-shadow: -5px 5px 5px ${LIGHT_GRAY};
    color: ${BLACK} !important;

    .subText {
      font-size: 16px;
      color: ${GRAY};
    }

    &.text:hover {
      text-decoration: none;
    }
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;

  @media only screen and (max-width: 800px) {
    width: 100%;
  }
`;

export const BudgetOptions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  button {
    box-shadow: -5px 5px 5px ${GRAY};
    background: ${WHITE} !important;
    border-radius: 10px !important;
    padding: 5px 10px 5px 5px !important;
  }
`;

export const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ModalBtn = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;

  &.referral button {
    height: auto;
    flex-direction: column;
    font-size: 24px;
  }
`;
