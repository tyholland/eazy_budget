import styled from "styled-components";
import { BLACK, RUBIK } from "../../index.style.ts";

export const Title = styled.div`
  font-family: ${RUBIK};
  font-size: 30px;
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

  ul,
  ol {
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;

    li ul {
      margin-top: 10px;
    }
  }
`;
