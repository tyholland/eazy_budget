import styled from "styled-components";
import { EARTH_GREEN, RUBIK, WHITE } from "../../index.style.ts";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  margin-bottom: 50px;

  @media only screen and (max-width: 800px) {
    width: 100%;
    gap: 40px;
  }
`;

export const Section = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  padding-bottom: 20px;
  width: 100%;

  @media only screen and (max-width: 800px) {
    flex-direction: column-reverse;
    gap: 0;
    padding-bottom: 0;
  }

  h1 {
    font-family: ${RUBIK};

    @media only screen and (max-width: 800px) {
      margin-top: 0;
    }
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
    min-width: 300px;
    max-width: 720px;
    width: 100%;
    border-radius: 15px;

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

  @media only screen and (max-width: 800px) {
    margin-bottom: 20px;
    max-width: none;
    min-width: auto;
  }
`;

export const Videos = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
  line-height: 35px;
  margin-top: 50px;

  @media only screen and (max-width: 800px) {
    flex-direction: column;
    width: 100%;
    margin-top: 0px;
    gap: 20px;
  }

  &.reverse {
    flex-direction: row-reverse;

    @media only screen and (max-width: 800px) {
      flex-direction: column;
      width: 100%;
    }
  }

  h2 {
    width: 50%;

    @media only screen and (max-width: 800px) {
      margin: 0;
      width: 100%;
    }
  }

  video {
    box-shadow: 0 0 12px;
    border-radius: 20px;
    width: 50%;

    @media only screen and (max-width: 800px) {
      width: 100%;
    }
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

  @media only screen and (max-width: 800px) {
    width: 80%;
    margin-bottom: 5%;
  }

  h2 {
    margin-top: 0;
  }
`;
