import styled from "styled-components";
import { BLACK, LIGHT_YELLOW } from "../../index.style.ts";

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
  border: 1px solid ${BLACK};
  width: 150px;
  height: 80px;
  border-radius: 10px;
  background: ${LIGHT_YELLOW};
  display: flex;
  gap: 12px;
  flex-direction: column;
  justify-content: center;

  @media only screen and (max-width: 800px) {
    width: 75%;
    height: auto;
  }
`;
