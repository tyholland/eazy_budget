import styled from "styled-components";
import { BLACK, WHITE } from "../../index.style.ts";

export const Input = styled.input`
  border-radius: 10px;
  border: 1px solid ${BLACK};
  padding: 10px;
  height: 12px;
  font-size: 16px;
  text-transform: capitalize;
  background: ${WHITE};

  &.text {
    text-transform: none;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const Label = styled.label`
  font-size: 18px;
  font-weight: 500;
  text-transform: capitalize;
  min-width: 100px;
  width: auto;
  text-align: right;
`;
