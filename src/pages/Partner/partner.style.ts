import styled from "styled-components";
import { BLACK, RUBIK, SKY_BLUE } from "../../index.style.ts";

export const Title = styled.div`
  font-family: ${RUBIK};
  font-size: 25px;
  font-weight: 700;
`;

export const SubTitle = styled.div`
  font-family: ${RUBIK};
  font-size: 20px;
  font-weight: 700;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;

  strong {
    font-weight: 600;
  }
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-bottom: 1px dotted ${BLACK};
  padding-bottom: 20px;

  ul {
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  a.text {
    font-weight: 600;
    display: inline-block;
    color: #06c;
    font-size: 16px;
    text-decoration: underline;

    &:hover {
      color: ${SKY_BLUE};
    }
  }

  &.last {
    border: 0;
  }
`;
