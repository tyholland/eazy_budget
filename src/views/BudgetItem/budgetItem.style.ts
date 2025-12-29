import styled from "styled-components";
import {
  DARKER_GRAY,
  EARTH_GREEN,
  GRAY,
  LIGHT_GRAY,
  LIGHT_GREEN,
  LIGHTER_GRAY,
  RED,
  WHITE,
} from "../../index.style.ts";

export const ItemWrapper = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-start;
  flex-direction: column;
  box-shadow: -10px 10px 10px ${LIGHT_GRAY};
  border-radius: 10px;
  padding: 15px;
  width: 100%;
  background: ${WHITE};

  .tooltip {
    width: 130px;
    text-align: center;
  }
`;

export const Item = styled.div`
  display: flex;
  gap: 16px;
  flex-direction: column;
  width: 100%;
`;

export const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

export const ItemTopRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TimingSelects = styled.div`
  display: flex;
  gap: 40px;

  @media only screen and (max-width: 800px) {
    flex-wrap: wrap;
    gap: 20px;
  }
`;

export const ModalItem = styled.div`
  display: flex;
  gap: 16px;
  flex-direction: column;

  .inputWrapper {
    justify-content: flex-start;
    gap: 8px;
  }

  @media only screen and (max-width: 800px) {
    width: 100%;
  }
`;

export const ErrorMsg = styled.ul`
  background: ${RED};
  padding: 15px 30px;
  border-radius: 10px;
  width: 200px;
  color: ${WHITE};
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Disclaimer = styled.div`
  font-style: italic;
  font-size: 14px;
`;

export const Total = styled.div`
  span {
    font-weight: 600;
  }
`;

export const ItemRightSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  span {
    display: flex;
    justify-content: flex-end;
  }

  label {
    margin-right: 0px;
  }

  .dropdownContent {
    display: none;
    position: absolute;

    button {
      border: none;
      background: ${WHITE};
      font-size: 16px;

      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }

  .show {
    display: block;
    background: ${WHITE};
    display: flex;
    flex-direction: column;
    padding: 10px;
    gap: 8px;
    border-radius: 10px;
    align-items: flex-start;
    box-shadow: -5px 5px 15px ${GRAY};
  }
`;

export const PaidSection = styled.div`
  display: flex;
  align-items: center;
  border-radius: 10px;
  box-shadow: -5px 5px 5px ${GRAY};
  background: ${LIGHTER_GRAY};
  gap: 10px;
  padding: 5px 10px;
  font-weight: 700;
  color: ${WHITE};
  text-shadow: 0 2px 2px ${DARKER_GRAY};

  &.green {
    background: linear-gradient(${LIGHT_GREEN}, ${EARTH_GREEN});
    text-shadow: none;
  }
`;
