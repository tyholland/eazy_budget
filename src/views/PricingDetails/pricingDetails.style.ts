import styled from "styled-components";
import { GRAY, LIGHT_GREEN, RUBIK, WHITE } from "../../index.style.ts";

export const Container = styled.div`
  box-shadow: -5px 5px 5px ${GRAY};
  border-radius: 10px;
  padding: 15px 10px;
  background: ${WHITE};
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  min-width: 220px;
  position: relative;
  height: 630px;

  &.paypal {
    height: 700px;

    @media only screen and (max-width: 800px) {
      height: auto;
    }
  }

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
    background: ${LIGHT_GREEN};
  }
`;

export const Wrapper = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;

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
  display: flex;
  gap: 4px;
  span {
    font-weight: 700;
  }

  .planPricing {
    span {
      color: ${GRAY};
      font-size: 13px;
      font-weight: 400;
    }
  }
`;

export const SubscribeBtn = styled.div`
  position: absolute;
  bottom: 15px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;

  &.paypal {
    position: relative;
    bottom: 0;
    margin-top: 20px;

    @media only screen and (max-width: 800px) {
      position: relative;
      bottom: auto;
      left: auto;
    }
  }

  @media only screen and (max-width: 800px) {
    position: relative;
    bottom: auto;
    left: auto;
  }
`;

export const ToggleWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  font-weight: 600;

  .toggle {
    box-shadow: -5px 5px 5px ${GRAY};
    background: ${WHITE};
    border-radius: 10px;
    padding: 10px 10px 10px 5px;
    width: 180px;
  }
`;
