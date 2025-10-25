import styled from "styled-components";
import { BLACK, RUBIK, WHITE } from "../../index.style.ts";

export const Container = styled.div`
  border: 1px solid ${BLACK};
  border-radius: 10px;
  padding: 15px 10px;
  background: ${WHITE};
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 700px;
  position: relative;
  height: 100%;
  margin: 0 auto;

  @media only screen and (max-width: 800px) {
    min-width: fit-content;
    width: 94%;
    padding: 4% 3%;
    height: auto;
  }

  span {
    font-weight: 700;
  }

  ul {
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

export const SubscribeBtn = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
  font-family: ${RUBIK};
`;

export const Price = styled.div`
  span {
    font-weight: 700;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
