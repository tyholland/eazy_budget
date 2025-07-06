import styled from "styled-components";
import { BLACK, RUBIK } from "../../index.style.ts";

export const MonthlyWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin: 30px 0;

  @media only screen and (max-width: 800px) {
    flex-direction: column;
  }
`;

export const Title = styled.h2`
  text-transform: capitalize;
  margin: 0;
  font-family: ${RUBIK};
`;

export const ItemContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;

  @media only screen and (max-width: 800px) {
    justify-content: center;
  }

  .itemWrapper {
    width: 190px;

    @media only screen and (max-width: 800px) {
      width: 290px;
    }

    .inputWrapper {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  input:not(:disabled) {
    width: 120px !important;
  }
`;

export const ItemWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
`;

export const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
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

export const Selectors = styled.div`
  display: flex;
  gap: 16px;

  .tooltip {
    width: 150px;
  }
`;

export const FilterLink = styled.div`
  display: flex;
  gap: 4px;

  a.text {
    color: ${BLACK};
    align-items: flex-start;
    font-weight: 600;
    height: 25px;
  }
`;
