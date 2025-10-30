import styled from "styled-components";
import { BLACK, GREEN, RUBIK } from "../../index.style.ts";

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
  width: 25px;

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
  align-items: center;
  gap: 15px;
`;

export const Title = styled.div`
  font-family: ${RUBIK};
  font-weight: 400;
`;
