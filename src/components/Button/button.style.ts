import styled from "styled-components";

export const Button = styled.button`
  border-radius: 30px;
  border: none;
  padding: 15px;
  width: 100px;
  cursor: pointer;
  font-weight: 700;
  background: #90d5ff;
  color: #000;

  &:hover {
    background: #57b9ff;
  }

  &.medium {
    width: 150px;
  }

  &.big {
    width: 200px;
  }

  &.register {
    background: #fff;
    border: 1px solid #000;
    color: #000;

    &:hover {
      border: 1px solid #57b9ff;
    }
  }

  &.exit {
    background: #000;
    color: #fff;

    &:hover {
      background: #555;
    }
  }

  &:disabled {
    background: #eee;
    color: #999;
    cursor: not-allowed;
    border: none;

    &:hover {
      background: #eee;
      color: #999;
      border: none;
    }
  }
`;
