import styled from "styled-components";
import { BLACK, LIGHT_SKY_BLUE, RUBIK, SKY_BLUE } from "../../index.style.ts";
import CsvDownloadButton from "react-json-to-csv";

export const ContentWrapper = styled.div`
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
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

  @media only screen and (max-width: 800px) {
    width: 100%;
  }

  &:hover {
    background: ${SKY_BLUE};
  }
`;

export const BudgetBreakdown = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const BudgetLineItem = styled.div`
  display: flex;
  gap: 8px;

  &.bold {
    font-weight: 700;
  }

  &.underline {
    border-bottom: 1px solid ${BLACK};
  }

  div {
    width: 200px;

    &.capital {
      text-transform: capitalize;
    }
  }
`;

export const Title = styled.h2`
  text-transform: capitalize;
  margin: 20px 0 0;
  font-family: ${RUBIK};
`;
