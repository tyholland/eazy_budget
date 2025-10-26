import styled from "styled-components";
import { BLACK, RUBIK, SKY_BLUE } from "../../index.style.ts";

export const Title = styled.div`
  font-family: ${RUBIK};
  font-size: 25px;
  font-weight: 700;
  display: flex;
  gap: 10px;
  align-items: center;
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
  line-height: 22px;

  strong {
    font-weight: 600;
  }
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  border-bottom: 1px dotted ${BLACK};
  padding-bottom: 20px;

  ul {
    margin: 5px 0 0;
    display: flex;
    flex-direction: column;
    gap: 5px;
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

  .secondaryTitle {
    margin-bottom: 5px;
    font-size: 18px;
  }
`;
