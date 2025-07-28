import styled from "styled-components";
import { BLACK, COSMIC, DARKER_GRAY, OFF_WHITE } from "../../index.style.ts";

export const HeaderWrapper = styled.div`
  display: flex;
  padding: 10px 0;
  margin-bottom: 20px;
  border-bottom: 1px solid ${DARKER_GRAY};
  justify-content: space-between;
  align-items: flex-end;
  background: ${OFF_WHITE};

  img {
    width: 25px;
    height: 25px;
    border-radius: 15px;
  }

  a.text {
    color: ${BLACK};
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
