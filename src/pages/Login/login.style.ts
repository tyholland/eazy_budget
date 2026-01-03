import styled from "styled-components";
import { GRAY, LIGHT_SKY_BLUE, RUBIK, WHITE } from "../../index.style.ts";

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

  .money {
    border-radius: 10px;
    box-shadow: 0 5px 10px ${GRAY};
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
    flex-direction: column;
    padding-bottom: 30px;

    strong {
      font-weight: 700;
    }

    .ending {
      font-size: 18px;
    }
  }

  &.steps {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-bottom: 30px;

    h2 {
      text-align: center;
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
    gap: 20px;
    box-shadow: 0 5px 10px ${GRAY};
    border-radius: 10px;
    padding: 10px 20px;
    height: 200px;
    width: 430px;

    img {
      border-radius: 10px;
      box-shadow: -5px 5px 5px ${GRAY};
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

export const Steps = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;

  img {
    border-radius: 10px;
    box-shadow: -5px 5px 5px ${GRAY};
  }

  .section {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .stepSection {
    display: flex;
    gap: 8px;
    font-weight: 700;
    align-items: center;

    .number {
      border-radius: 100px;
      border: 2px solid ${LIGHT_SKY_BLUE};
      padding: 5px 12px;
    }
  }
`;

export const Upgrade = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;

  img {
    border-radius: 10px;
    box-shadow: -5px 5px 5px ${GRAY};
  }
`;

export const SplitSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 20px;
`;
