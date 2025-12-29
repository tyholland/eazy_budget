import styled from "styled-components";
import {
  BLACK,
  GRAY,
  GREEN,
  LIGHT_GREEN,
  RUBIK,
  WHITE,
} from "../../index.style.ts";

export const ProgressBar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Meter = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${BLACK};
  border-radius: 5px;
`;

export const Block = styled.div`
  width: 9px;

  &.active {
    background: ${GREEN};
  }

  &:first-child {
    border-radius: 5px 0 0 5px;
  }

  &:last-child {
    border-radius: 0 5px 5px 0;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  gap: 25px;
  font-size: 16px;
  align-items: center;
  padding: 25px 0;
`;

export const Title = styled.div`
  font-family: ${RUBIK};
  font-weight: 700;
  font-size: 22px;
`;

export const BudgetContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  .points {
    font-size: 14px;
  }
`;

export const Section = styled.div`
  display: flex;
  gap: 10px;

  .name {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

export const PercentWrapper = styled.div`
  background: linear-gradient(to right, ${LIGHT_GREEN} 35%, ${GREEN} 95%);
  height: 140px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;

  .percent {
    background: ${WHITE};
    border-radius: 100px;
    padding: 10px;
    height: 120px;
    width: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 20px;
  }
`;

export const Next = styled.div`
  font-size: 14px;
  font-weight: 700;
  display: flex;
  gap: 5px;
  flex-direction: column;

  span {
    font-weight: 400;
  }

  .unlock {
    font-weight: 400;
    font-style: italic;
    color: ${GRAY};
  }
`;
