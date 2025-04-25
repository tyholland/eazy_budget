import styled from "styled-components";
import { RUBIK } from "../../index.style.ts";

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 3%;
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
