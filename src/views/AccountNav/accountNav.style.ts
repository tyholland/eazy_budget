import styled from "styled-components";
import { BLACK, GRAY, LIGHT_GRAY, SKY_BLUE, WHITE } from "../../index.style.ts";

export const NavWrapper = styled.div`
  width: 100%;
  display: flex;
  border-radius: 10px;
  box-shadow: 0 0 30px ${LIGHT_GRAY};
  background: ${WHITE};
`;

export const NavItem = styled.div`
  background: ${WHITE};
  width: 50%;
  border-radius: 10px;

  &.subscribe {
    @media only screen and (max-width: 800px) {
      width: 30%;
    }

    &:nth-child(3) {
      @media only screen and (max-width: 800px) {
        width: 40%;
      }
    }
  }

  button {
    padding: 10px 0 10px 10px !important;
    width: 100% !important;
    font-size: 18px !important;
    background: ${WHITE} !important;
    border-radius: 10px !important;

    @media only screen and (max-width: 800px) {
      padding: 10px 0 !important;
    }
  }

  &.close {
    button {
      color: ${BLACK};

      &:hover {
        color: ${BLACK};
        text-decoration: underline;
      }
    }
  }

  &.open {
    background: transparent;
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      color: ${SKY_BLUE};
      box-shadow: -5px 5px 5px ${GRAY};
      width: 90% !important;
      padding: 6px !important;
      height: 30px;
    }
  }
`;
