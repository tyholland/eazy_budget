import styled from "styled-components";
import {
  BLACK,
  DARK_GRAY,
  GRAY,
  LIGHT_SKY_BLUE,
  LIGHTER_GRAY,
  SKY_BLUE,
  WHITE,
} from "../../index.style.ts";

export const Button = styled.button`
  border-radius: 30px;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;

  &.default {
    background: ${LIGHT_SKY_BLUE};
    color: ${BLACK};

    &:hover {
      background: ${SKY_BLUE};
    }
  }

  &.small {
    width: 150px;
    font-size: 14px;
  }

  &.medium {
    width: 220px;
    font-size: 16px;
  }

  &.large {
    width: 250px;
    font-size: 18px;

    @media only screen and (max-width: 800px) {
      width: 100%;
    }
  }

  &.register {
    background: ${WHITE};
    border: 1px solid ${BLACK};
    color: ${BLACK};

    &:hover {
      border: 1px solid ${SKY_BLUE};
    }
  }

  &.exit {
    background: ${BLACK};
    color: ${WHITE};

    &:hover {
      background: ${DARK_GRAY};
    }
  }

  &.text {
    background: transparent;
    border-radius: 0;
    width: auto;
    padding: 0;

    &:hover {
      background: transparent;
    }
  }

  &:disabled {
    background: ${LIGHTER_GRAY};
    color: ${GRAY};
    cursor: not-allowed;
    border: none;

    &:hover {
      background: ${LIGHTER_GRAY};
      color: ${GRAY};
      border: none;
    }
  }
`;
