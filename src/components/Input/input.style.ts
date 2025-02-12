import styled from "styled-components";

export const Input = styled.input`
  border-radius: 10px;
  border: 1px solid #000;
  padding: 10px;
  height: 12px;
  font-size: 16px;

  &:disabled {
    border: 1px solid red;
    background: #ffcccb;
    color: #000;
  }

  &.small {
    width: 100px;
  }

  &.medium {
    width: 150px;
  }

  &.big {
    width: 200px;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const Label = styled.label`
  font-size: 18px;
  font-weight: 700;
`;
