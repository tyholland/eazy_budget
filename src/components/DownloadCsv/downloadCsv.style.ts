import styled from "styled-components";
import {
  BLACK,
  LIGHT_SKY_BLUE,
  LIGHT_YELLOW,
  RUBIK,
  SKY_BLUE,
  WHITE,
} from "../../index.style.ts";
import CsvDownloadButton from "react-json-to-csv";

export const ContentWrapper = styled.div`
  display: flex;
  gap: 40px;
  flex-direction: column;
  max-width: 650px;
  width: 100%;
`;

export const CsvBtn = styled(CsvDownloadButton)`
  text-transform: capitalize;
  border-radius: 10px;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
  background: ${LIGHT_SKY_BLUE};
  color: ${BLACK};
  max-width: 500px;
  width: 100%;
  height: auto;
  font-size: 20px;

  &:hover {
    background: ${SKY_BLUE};
  }
`;

export const BudgetBreakdown = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid ${BLACK};
  padding: 10px;
  background: ${WHITE};
`;

export const BudgetLineItem = styled.div`
  display: flex;
  gap: 8px;
  font-size: 14px;
  padding: 0 10px;

  @media only screen and (max-width: 800px) {
    align-items: center;
    gap: 12px;
  }

  &.header {
    font-weight: 700;
    font-size: 18px;
    border: 1px solid ${BLACK};
    background: ${LIGHT_YELLOW};
    padding: 5px 10px;
  }

  &.endCategory,
  &.category {
    font-weight: 500;
    font-style: italic;
  }

  &.category {
    .capital {
      border-bottom: 1px dotted ${BLACK};
    }
  }

  &.section {
    font-weight: 600;
    font-size: 16px;
    border-bottom: 1px solid ${BLACK};
  }

  &.endSection {
    font-weight: 600;
    font-size: 16px;
    border-bottom: 1px solid ${BLACK};
  }

  &.net {
    font-weight: 600;
    font-size: 16px;
  }

  div {
    width: 200px;

    @media only screen and (max-width: 800px) {
      width: 100%;
    }

    &.capital {
      text-transform: capitalize;

      @media only screen and (max-width: 800px) {
        padding-left: 0px;
      }
    }
  }
`;

export const Title = styled.h2`
  text-transform: capitalize;
  margin: 20px 0 0;
  font-family: ${RUBIK};
`;

export const BudgetRuleContent = styled.div`
  .month {
    text-transform: capitalize;
  }

  strong {
    font-weight: 600;
  }
`;
