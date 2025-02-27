import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const GreyedOut = styled.div`
  color: #999;

  a {
    color: #999;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
      color: #333;
    }
  }
`;
