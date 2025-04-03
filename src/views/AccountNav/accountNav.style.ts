import styled from "styled-components";

export const NavWrapper = styled.div`
  width: 20%;

  @media only screen and (max-width: 800px) {
    width: 100%;
    display: flex;
  }

  div:last-child {
    border-bottom: 2px solid #ddd;

    @media only screen and (max-width: 800px) {
      border-right: 2px solid #ddd;
      border-bottom: 0;
    }
  }
`;

export const NavItem = styled.div`
  @media only screen and (max-width: 800px) {
    width: 33%;
  }

  &.subscribe {
    @media only screen and (max-width: 800px) {
      width: 22%;
    }

    &:nth-child(3) {
      @media only screen and (max-width: 800px) {
        width: 34%;
      }
    }
  }

  button {
    border: 2px solid #ddd;
    border-bottom: 0;
    justify-content: flex-start;
    padding: 10px 0 10px 10px !important;
    width: 100% !important;
    font-size: 18px !important;

    @media only screen and (max-width: 800px) {
      padding: 10px 0 !important;
      justify-content: center;
      border-bottom: 2px solid #ddd;
      border-right: 0;
    }
  }

  &.close {
    button {
      color: #999;

      &:hover {
        color: #000;
        text-decoration: underline;

        @media only screen and (max-width: 800px) {
          color: #999;
          text-decoration: none;
        }
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
