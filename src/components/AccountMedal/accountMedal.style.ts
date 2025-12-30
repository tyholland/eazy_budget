import styled from "styled-components";
import { GRAY, RUBIK, WHITE } from "../../index.style.ts";

export const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .points {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    span {
      color: ${GRAY};
      font-size: 12px;
    }
  }

  .task {
    display: flex;
    align-items: center;
    gap: 10px;

    div {
      @media only screen and (max-width: 800px) {
        width: 180px;
      }
    }
  }

  &.header {
    justify-content: normal;
    gap: 25px;
    align-items: flex-start;

    @media only screen and (max-width: 800px) {
      flex-direction: column;
      align-items: center;
    }
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .pointWrapper {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }
`;

export const Title = styled.div`
  font-family: ${RUBIK};
  font-weight: 600;
  text-transform: capitalize;
  display: flex;
  justify-content: space-between;

  .complete {
    font-weight: 400;
    font-size: 14px;
    text-transform: lowercase;
  }

  &.medalName {
    font-size: 30px;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
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

export const TaskSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  font-weight: 400;

  .task {
    margin-left: 15px;

    @media only screen and (max-width: 800px) {
      margin-left: 0;
    }
  }

  span {
    font-style: italic;
    font-size: 14px;
    color: ${GRAY};
  }
`;

export const TaskContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: ${WHITE};
  border-radius: 10px;
  box-shadow: -5px 5px 5px ${GRAY};
  padding: 20px;
`;

export const Descript = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 550px;
  width: 100%;
`;

export const ClaimBtn = styled.div`
  margin-top: 10px;

  button {
    padding: 10px 40px;
  }
`;
