import { Link } from "react-router-dom";
import styled from "styled-components";

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
    background: #90d5ff;
    color: #000;

    &:hover {
      background: #57b9ff;
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

  &.text {
    background: transparent;
    border-radius: 0;
    padding: 0;
    color: #999;
    text-decoration: none;
    font-weight: 400;
    width: auto;

    &:hover {
      text-decoration: underline;
      color: #333;
    }
  }
`;
