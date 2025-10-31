import styled from "styled-components";
import { RUBIK } from "../../index.style.ts";

export const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Title = styled.div`
  font-family: ${RUBIK};
  font-weight: 600;
`;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
