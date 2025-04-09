import styled from "styled-components";
import { BLACK, GRAY, LIGHT_GRAY } from "../../index.style.ts";

export const NavWrapper = styled.div`
  width: 125px;

  @media only screen and (max-width: 800px) {
    width: 100%;
    display: flex;
  }

  div:last-child {
    border-bottom: 2px solid ${LIGHT_GRAY};

    @media only screen and (max-width: 800px) {
      border-right: 2px solid ${LIGHT_GRAY};
      border-bottom: 0;
    }
  }
`;

export const NavItem = styled.div`
  @media only screen and (max-width: 800px) {
    width: 25%;
  }

  button {
    border: 2px solid ${LIGHT_GRAY};
    border-bottom: 0;
    justify-content: flex-start;
    padding: 10px 0 10px 10px !important;
    width: 100% !important;
    font-size: 18px !important;

    @media only screen and (max-width: 800px) {
      padding: 10px 0 !important;
      justify-content: center;
      border-bottom: 2px solid ${LIGHT_GRAY};
      border-right: 0;
    }
  }

  &.close {
    button {
      color: ${GRAY};

      &:hover {
        color: ${BLACK};
        text-decoration: underline;
      }
    }
  }

  &.open {
    button {
      border-right: 0;

      @media only screen and (max-width: 800px) {
        border-bottom: 0;
      }
    }
  }
`;
