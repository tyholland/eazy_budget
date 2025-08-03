import styled from "styled-components";
import {
  BLACK,
  GREEN,
  LIGHT_GREEN,
  LIGHT_SKY_BLUE,
  RUBIK,
  WHITE,
} from "../../index.style.ts";

export const Container = styled.div`
  border: 1px solid ${BLACK};
  border-radius: 10px;
  padding: 15px 10px;
  background: ${WHITE};
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  min-width: 220px;
  position: relative;
  height: 560px;

  @media only screen and (max-width: 800px) {
    min-width: fit-content;
    width: 94%;
    padding: 4% 3%;
    height: auto;
  }

  span {
    font-weight: 700;
  }

  ul {
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &.highlight {
    background: ${LIGHT_SKY_BLUE};

    .paypal button {
      border: 1px solid ${BLACK};
      background: ${LIGHT_GREEN};

      &:hover {
        background: ${GREEN};
      }
    }
  }
`;

export const Wrapper = styled.div`
  display: flex;
  gap: 20px;

  @media only screen and (max-width: 800px) {
    flex-direction: column;
  }
`;

export const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
  font-family: ${RUBIK};
`;

export const Price = styled.div`
  span {
    font-weight: 700;
  }
`;

export const SubscribeBtn = styled.div`
  position: absolute;
  bottom: 15px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;

  @media only screen and (max-width: 800px) {
    position: relative;
    bottom: auto;
    left: auto;
  }
`;
