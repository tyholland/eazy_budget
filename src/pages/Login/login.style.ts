import styled from "styled-components";
import { EARTH_GREEN, OFF_WHITE, RUBIK, WHITE } from "../../index.style.ts";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${OFF_WHITE};
  gap: 50px;

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

  h1 {
    font-family: ${RUBIK};
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
    background: ${EARTH_GREEN};
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

export const Videos = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
  line-height: 35px;
  margin-top: 50px;

  &.reverse {
    flex-direction: row-reverse;
  }

  video {
    box-shadow: 0 0 12px;
    border-radius: 20px;
  }
`;

export const Pitch = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
  text-align: center;
  background: ${EARTH_GREEN};
  color: ${WHITE};
  border-radius: 15px;
  padding: 20px;
`;
