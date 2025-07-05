import styled from "styled-components";
import { RUBIK } from "../../index.style.ts";

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-size: 18px;

  strong {
    font-weight: 500;
  }
`;

export const Header = styled.div`
  font-weight: 700;
  font-family: ${RUBIK};
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-top: 30px;
`;

export const InputWrapper = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;

  @media only screen and (max-width: 800px) {
    flex-direction: column;
  }
`;

export const CategoryList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;

  button {
    display: flex;
    justify-content: space-around;
  }
`;
