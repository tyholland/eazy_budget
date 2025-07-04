import styled from "styled-components";
import { ERROR_RED, RUBIK, WHITE } from "../../index.style.ts";

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 18px;

  strong {
    font-weight: 500;
  }
`;

export const Header = styled.div`
  font-weight: 700;
  font-family: ${RUBIK};
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-top: 30px;
`;

export const InputWrapper = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
`;
