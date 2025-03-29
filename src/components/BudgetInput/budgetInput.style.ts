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

  &:disabled {
    @media only screen and (max-width: 800px) {
      font-size: 20px;
    }
  }

  &.small {
    width: 100px;

    &:disabled {
      @media only screen and (max-width: 800px) {
        width: 140px;
      }
    }
  }

  &.medium {
    width: 150px;

    @media only screen and (max-width: 800px) {
      width: 135px;
    }

    &:disabled {
      @media only screen and (max-width: 800px) {
        width: 160px;
      }
    }
  }

  &.large {
    width: 200px;
  }

  @media only screen and (max-width: 800px) {
    font-size: 18px;
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
  text-transform: capitalize;
  min-width: 100px;
  width: auto;
`;
