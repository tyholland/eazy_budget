import styled from "styled-components";
import { BLACK, LIGHT_SKY_BLUE } from "../../index.style.ts";

export const NavWrapper = styled.div`
  width: 125px;

  @media only screen and (max-width: 800px) {
    width: 100%;
    display: flex;
  }

  div:last-child {
    border-bottom: 2px solid ${BLACK};

    @media only screen and (max-width: 800px) {
      border-right: 2px solid ${BLACK};
      border-bottom: 0;
    }
  }
`;

export const NavItem = styled.div`
  background: ${LIGHT_SKY_BLUE};

  @media only screen and (max-width: 800px) {
    width: 25%;
  }

  button {
    border: 2px solid ${BLACK};
    border-bottom: 0;
    justify-content: flex-start;
    padding: 10px 0 10px 10px !important;
    width: 100% !important;
    font-size: 18px !important;

    @media only screen and (max-width: 800px) {
      padding: 10px 0 !important;
      justify-content: center;
      border-bottom: 2px solid ${BLACK};
      border-right: 0;
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

    button {
      border-right: 0;

      @media only screen and (max-width: 800px) {
        border-bottom: 0;
      }
    }
  }
`;
