import styled from "styled-components";
import {
  BLACK,
  LIGHT_GREEN,
  LIGHT_YELLOW,
  OFF_WHITE,
} from "../../index.style.ts";

export const Section = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  background: ${OFF_WHITE};
  padding-bottom: 20px;
  width: 100%;

  @media only screen and (max-width: 800px) {
    flex-direction: column-reverse;
    gap: 0;
    padding-bottom: 0;
  }

  &.link {
    justify-content: center;
    padding: 0;

    a {
      width: 90%;
      height: 60px;
      font-size: 28px;
      border-radius: 15px;
      background: ${LIGHT_GREEN};
      box-shadow: 0 0 10px ${BLACK};

      &:hover {
        background: ${LIGHT_YELLOW};
      }

      @media only screen and (max-width: 800px) {
        height: auto;
      }
    }
  }

  &.account {
    margin-top: 10px;

    a {
      font-size: 18px;
      height: 40px;
      width: 60%;

      @media only screen and (max-width: 800px) {
        width: 70%;
        text-align: center;
      }
    }
  }
`;
