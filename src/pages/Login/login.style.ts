import styled from "styled-components";
import { EARTH_GREEN, GRAY, RUBIK, WHITE } from "../../index.style.ts";

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
  width: 94%;
  border-radius: 10px;
  box-shadow: 0 5px 10px ${GRAY};
  padding: 10px 3%;
  background: ${WHITE};

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
    width: 100%;
    margin-bottom: 0;
    font-weight: 400;

    .bold {
      font-weight: 700;
    }

    @media only screen and (max-width: 800px) {
      width: 100%;
    }
  }

  .device {
    width: 500px;
    margin: 0 auto;
  }

  &.complicated {
    display: flex;
    flex-direction: column;
    gap: 15px;

    strong {
      font-weight: 700;
    }

    .ending {
      margin-bottom: 20px;
    }
  }
`;

export const Catchphrase = styled.div`
  max-width: 430px;
  min-width: 330px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;

  .subText {
    font-weight: 500;
  }

  h1 {
    margin: 0;
  }

  @media only screen and (max-width: 800px) {
    margin-bottom: 20px;
    max-width: none;
    min-width: auto;
  }
`;

export const PainPoint = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
  width: 100%;

  .solution {
    display: flex;
    align-items: center;
    gap: 10px;

    img {
      box-shadow: 0 5px 10px ${GRAY};
      border-radius: 10px;
    }
  }

  .spreadsheet {
    border-radius: 10px;
  }
`;

export const BulletSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  .bullet {
    display: flex;
    align-items: center;
    gap: 4px;
    font-weight: 700;
  }
`;
