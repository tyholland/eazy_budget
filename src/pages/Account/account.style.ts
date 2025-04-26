import styled from "styled-components";
import {
  BLACK,
  DARKER_GRAY,
  LIGHT_YELLOW,
  RUBIK,
  SKY_BLUE,
} from "../../index.style.ts";

export const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 30px;
  margin: 30px auto;

  @media only screen and (max-width: 800px) {
    width: 100%;
    flex-direction: column;
  }

  img {
    min-width: 100px;
    max-width: 759px;
    width: 100%;

    @media only screen and (max-width: 800px) {
      display: none;
    }
  }
`;

export const Section = styled.div`
  width: 370px;
  display: flex;

  @media only screen and (max-width: 800px) {
    width: 100%;
  }

  &.date {
    input {
      width: 50%;
    }
  }

  > div {
    width: 100%;
    margin-bottom: 20px;

    @media only screen and (max-width: 800px) {
      margin-bottom: 10px;
    }

    label {
      min-width: auto;
    }

    input {
      width: 100%;

      @media only screen and (max-width: 800px) {
        width: 50%;
      }
    }
  }

  a,
  button {
    color: ${DARKER_GRAY} !important;
    font-weight: 700 !important;
    font-size: 16px !important;
    width: 100% !important;
    padding: 0 0 10px 0 !important;
    justify-content: flex-start;
    border-bottom: 1px solid ${DARKER_GRAY};

    &:hover {
      color: ${SKY_BLUE} !important;
      text-decoration: none !important;
    }
  }

  span {
    text-transform: capitalize;
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

export const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ModalBtn = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

export const ContentWrapper = styled.div`
  min-width: 400px;
  max-width: 400px;
  width: 100%;
  display: flex;
  gap: 20px;
  flex-direction: column;

  @media only screen and (max-width: 800px) {
    width: 100%;
    min-width: unset;
    max-width: unset;
  }
`;

export const SharedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 400px;
  margin: 0 auto;
  background: ${LIGHT_YELLOW};
  padding: 15px;
  border-radius: 10px;
  border: 1px solid ${BLACK};
  font-family: ${RUBIK};
  font-weight: 700;
  font-size: 18px;
`;

export const SharedBtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
