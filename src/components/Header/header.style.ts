import styled from "styled-components";
import { COSMIC, DARKER_GRAY } from "../../index.style.ts";

export const HeaderWrapper = styled.div`
  display: flex;
  padding-bottom: 10px;
  margin: 10px 0 20px;
  border-bottom: 1px solid ${DARKER_GRAY};
  justify-content: space-between;
  align-items: flex-end;

  img {
    width: 25px;
    height: 25px;
    border-radius: 15px;
  }
`;

export const Title = styled.div`
  font-family: ${COSMIC};
  font-style: italic;
  font-size: 40px;
  font-weight: 700;

  @media only screen and (max-width: 800px) {
    font-size: 30px;
  }
`;
