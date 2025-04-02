import styled from "styled-components";

export const NavWrapper = styled.div`
  width: 15%;

  div:last-child {
    border-bottom: 2px solid #ddd;
  }
`;

export const NavItem = styled.div`
  button {
    border: 2px solid #ddd;
    border-bottom: 0;
    justify-content: flex-start;
    padding: 10px 0 10px 10px !important;
    width: 100% !important;
    font-size: 18px !important;
  }

  &.close {
    button {
      color: #999;

      &:hover {
        color: #000;
        text-decoration: underline;
      }
    }
  }

  &.open {
    button {
      border-right: 0;
    }
  }
`;
