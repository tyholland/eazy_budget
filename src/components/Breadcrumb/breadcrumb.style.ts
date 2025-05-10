import styled from "styled-components";
import { DARKER_GRAY, GRAY } from "../../index.style.ts";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 10px;
  font-size: 14px;
`;

export const GreyedOut = styled.div`
  color: ${GRAY};
  font-size: 14px;

  a {
    color: ${GRAY};
    text-decoration: none;
    font-size: 14px !important;

    &:hover {
      text-decoration: underline;
      color: ${DARKER_GRAY};
    }
  }
`;
