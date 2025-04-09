import styled from "styled-components";
import { BLACK, GRAY, WHITE } from "../../index.style.ts";

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
    background: #90d5ff;
    color: ${BLACK};

    &:hover {
      background: #57b9ff;
    }
  }

  &.small {
    width: 150px;
    font-size: 14px;
  }

  &.medium {
    width: 200px;
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
      border: 1px solid #57b9ff;
    }
  }

  &.exit {
    background: ${BLACK};
    color: ${WHITE};

    &:hover {
      background: #555;
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
    background: #eee;
    color: ${GRAY};
    cursor: not-allowed;
    border: none;

    &:hover {
      background: #eee;
      color: ${GRAY};
      border: none;
    }
  }
`;
