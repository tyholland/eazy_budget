import styled from "styled-components";
import { BLACK, SKY_BLUE } from "../../index.style.ts";

export const NavWrapper = styled.div`
  min-width: 161px;
  max-width: 161px;
  width: 100%;

  @media only screen and (max-width: 800px) {
    width: 100%;
    min-width: unset;
    max-width: unset;
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
  background: ${SKY_BLUE};

  @media only screen and (max-width: 800px) {
    width: 50%;
  }

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

        @media only screen and (max-width: 800px) {
          color: ${BLACK};
          text-decoration: none;
        }
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
