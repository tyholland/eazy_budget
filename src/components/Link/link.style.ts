import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  BLACK,
  DARKER_GRAY,
  GRAY,
  LIGHT_SKY_BLUE,
  LIGHTER_GRAY,
  SKY_BLUE,
} from "../../index.style.ts";

export const LinkElement = styled(Link)`
  border-radius: 30px;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
  text-decoration: none;

  &.button {
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
    width: 200px;
    font-size: 16px;
  }

  &.large {
    width: 250px;
    font-size: 18px;
  }

  &.text,
  &.partner {
    background: transparent;
    border-radius: 0;
    padding: 0;
    color: ${GRAY};
    text-decoration: none;
    font-weight: 400;
    width: auto;

    &:hover {
      text-decoration: underline;
      color: ${DARKER_GRAY};
    }
  }

  &.disabled {
    background: ${LIGHTER_GRAY};
    color: ${GRAY};
    border: none;
    pointer-events: none;

    &:hover {
      background: ${LIGHTER_GRAY};
      color: ${GRAY};
      border: none;
      pointer-events: none;
    }
  }

  &.partner {
    @media only screen and (max-width: 800px) {
      display: none;
    }
  }
`;
