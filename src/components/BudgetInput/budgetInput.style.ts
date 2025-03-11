import styled from "styled-components";

export const Input = styled.input`
  border-radius: 10px;
  border: 1px solid #000;
  padding: 10px;
  height: 12px;
  font-size: 16px;
  text-transform: capitalize;

  &.default {
    &:disabled {
      border: 1px solid #000;
      background: #fff;
      color: #333;
    }
  }

  &.expense {
    &:disabled {
      border: 1px solid #f00;
      background: #ffcccb;
      color: #000;
    }
  }

  &.income {
    &:disabled {
      border: 1px solid #00ff00;
      background: #cefad0;
      color: #000;
    }
  }

  &.small {
    width: 100px;
  }

  &.medium {
    width: 150px;
  }

  &.large {
    width: 200px;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const Label = styled.label`
  font-size: 18px;
  font-weight: 700;
  text-transform: capitalize;
  min-width: 100px;
  width: auto;
`;
