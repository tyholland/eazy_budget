import styled from "styled-components";
import {
  DARKER_GRAY,
  ERROR_RED,
  LIGHTER_GRAY,
  SKY_BLUE,
  WHITE,
} from "../../index.style.ts";

export const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 30px;
  margin: 30px auto;
  width: 100%;
  flex-direction: column;

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
    flex-direction: column;
    align-items: flex-start;

    @media only screen and (max-width: 800px) {
      margin-bottom: 10px;
    }

    label {
      min-width: auto;
    }

    input {
      width: 94%;
      padding: 3%;
      background: ${LIGHTER_GRAY};
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

  &.referral button {
    height: auto;
    flex-direction: column;
    font-size: 24px;
  }
`;

export const ContentWrapper = styled.div`
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

export const ErrorMsg = styled.div`
  background: ${ERROR_RED};
  color: ${WHITE};
  border-radius: 10px;
  padding: 10px 15px;
  max-width: 400px;
  width: auto;
  font-weight: 700;
`;

export const AdminSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid ${DARKER_GRAY};
  padding-bottom: 10px;
`;
