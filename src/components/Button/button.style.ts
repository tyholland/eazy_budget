import styled from "styled-components";

export const Button = styled.button`
  border-radius: 30px;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;

  &.default {
    background: #90d5ff;
    color: #000;

    &:hover {
      background: #57b9ff;
    }
  }

  &.small {
    width: 100px;
  }

  &.medium {
    width: 150px;
  }

  &.large {
    width: 200px;

    @media only screen and (max-width: 800px) {
      width: 100%;
      font-size: 18px;
    }
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

  &.text {
    background: transparent;
    border-radius: 0;
    width: auto;
    padding: 0;

    &:hover {
      background: transparent;
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
