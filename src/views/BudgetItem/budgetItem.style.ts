import styled from "styled-components";
import { DARKER_GRAY, RED, WHITE } from "../../index.style.ts";

export const ItemWrapper = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-start;
  flex-direction: column;
  border: 1px solid ${DARKER_GRAY};
  border-radius: 10px;
  padding: 15px;
  width: 290px;
  background: ${WHITE};

  .tooltip {
    width: 130px;
    text-align: center;
  }
`;

export const Item = styled.div`
  display: flex;
  gap: 16px;
  flex-direction: column;

  @media only screen and (max-width: 800px) {
    width: 100%;
  }
`;

export const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const ItemTopRow = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

export const TimingSelects = styled.div`
  display: flex;
  gap: 40px;
`;

export const ModalItem = styled.div`
  display: flex;
  gap: 16px;
  flex-direction: column;

  .inputWrapper {
    flex-direction: row;
  }

  @media only screen and (max-width: 800px) {
    width: 100%;
  }
`;

export const ErrorMsg = styled.ul`
  background: ${RED};
  padding: 15px 30px;
  border-radius: 10px;
  width: 200px;
  color: ${WHITE};
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
