import styled from "styled-components";
import { DUSTY_ROSE, OFF_WHITE, WHITE } from "../../index.style.ts";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${OFF_WHITE};

  @media only screen and (max-width: 800px) {
    width: 100%;
  }
`;

export const Section = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  background: ${OFF_WHITE};
  padding-bottom: 20px;
  width: 100%;

  @media only screen and (max-width: 800px) {
    flex-direction: column;
    gap: 0;
  }

  h2 {
    width: 80%;
    margin: 0 auto;
    text-align: center;

    @media only screen and (max-width: 800px) {
      width: 100%;
    }
  }

  img {
    min-width: 500px;
    max-width: 720px;
    width: 100%;

    @media only screen and (max-width: 800px) {
      min-width: unset;
      max-width: unset;
    }
  }

  &.title {
    padding: 20px 0;
    width: 90%;
    height: 130px;
    background: ${DUSTY_ROSE};
    color: ${WHITE};
    border-radius: 15px;

    @media only screen and (max-width: 800px) {
      width: 100%;
      height: auto;
    }
  }
`;

export const Catchphrase = styled.div`
  max-width: 450px;
  min-width: 330px;
  width: 100%;
`;
