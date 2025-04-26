import styled from "styled-components";
import { BLACK, LIGHT_YELLOW, RUBIK } from "../../index.style.ts";

export const SharedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 400px;
  margin: 0 auto;
  background: ${LIGHT_YELLOW};
  padding: 15px;
  border-radius: 10px;
  border: 1px solid ${BLACK};
  font-family: ${RUBIK};
  font-weight: 700;
  font-size: 18px;
`;

export const SharedBtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
