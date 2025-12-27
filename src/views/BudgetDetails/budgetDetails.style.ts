import styled from "styled-components";
import { GRAY, WHITE } from "../../index.style.ts";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;

  @media only screen and (max-width: 800px) {
    justify-content: center;
  }
`;

export const TotalBudgetWrapper = styled.div`
  padding: 15px;
  width: 100%;
  border-radius: 10px;
  background: ${WHITE};
  display: flex;
  gap: 12px;
  box-shadow: -5px 5px 5px ${GRAY};
`;
