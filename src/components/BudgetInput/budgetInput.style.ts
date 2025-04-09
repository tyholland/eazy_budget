import styled from "styled-components";
import {
  BLACK,
  DARKER_GRAY,
  GREEN,
  LIGHT_GREEN,
  LIGHT_RED,
  RED,
  WHITE,
} from "../../index.style.ts";

export const Input = styled.input`
  border-radius: 10px;
  border: 1px solid ${BLACK};
  padding: 10px;
  height: 12px;
  font-size: 16px;
  text-transform: capitalize;

  &.default {
    &:disabled {
      border: 1px solid ${BLACK};
      background: ${WHITE};
      color: ${DARKER_GRAY};
    }
  }

  &.expense {
    &:disabled {
      border: 1px solid ${RED};
      background: ${LIGHT_RED};
      color: ${BLACK};
    }
  }

  &.income {
    &:disabled {
      border: 1px solid ${GREEN};
      background: ${LIGHT_GREEN};
      color: ${BLACK};
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
        width: 160px;
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
  flex-direction: column;
  align-items: flex-start;
`;

export const Label = styled.label`
  font-size: 18px;
  font-weight: 700;
  text-transform: capitalize;
  min-width: 100px;
  width: auto;
`;
