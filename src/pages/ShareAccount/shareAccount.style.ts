import styled from "styled-components";
import { ERROR_RED, RUBIK, WHITE } from "../../index.style.ts";

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 3%;

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

export const ShareWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
`;

export const ErrorMsg = styled.div`
  background: ${ERROR_RED};
  color: ${WHITE};
  border-radius: 10px;
  padding: 10px 15px;
  width: 300px;
  font-weight: 700;
`;

export const Confirmed = styled.div`
  width: 450px;
  font-weight: 700;
  display: flex;
  gap: 10px;
`;
