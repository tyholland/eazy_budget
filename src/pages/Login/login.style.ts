import styled from "styled-components";
import { DUSTY_ROSE, OFF_WHITE, WHITE } from "../../index.style.ts";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${OFF_WHITE};
  padding-top: 20px;

  @media only screen and (max-width: 800px) {
    width: 100%;
  }
`;

export const Section = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  background: ${OFF_WHITE};
  padding: 0 1% 20px;
  width: 98%;

  h2 {
    width: 80%;
    margin: 0 auto;
    text-align: center;
  }

  img {
    min-width: 500px;
    max-width: 720px;
    width: 100%;
  }

  &.title {
    padding: 20px 0;
    width: 100%;
    height: 130px;
    background: ${DUSTY_ROSE};
    color: ${WHITE};
  }
`;

export const Catchphrase = styled.div`
  max-width: 450px;
  min-width: 350px;
  width: 100%;
`;
