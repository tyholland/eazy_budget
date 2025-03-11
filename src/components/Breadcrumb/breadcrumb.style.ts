import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 10px;
  font-size: 14px;
`;

export const GreyedOut = styled.div`
  color: #999;
  font-size: 14px;

  a {
    color: #999;
    text-decoration: none;
    font-size: 14px !important;

    &:hover {
      text-decoration: underline;
      color: #333;
    }
  }
`;
