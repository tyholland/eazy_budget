import styled from "styled-components";
import { GRAY, RUBIK } from "../../index.style.ts";

export const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  .points {
    font-weight: 500;
  }
`;

export const Title = styled.div`
  font-family: ${RUBIK};
  font-weight: 600;
  text-transform: capitalize;

  &.medalName {
    font-size: 30px;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
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
  gap: 4px;
  font-weight: 400;

  .task {
    margin-left: 15px;
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
`;

export const Descript = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-weight: 500;
  margin: 0 0 15px 0;
  max-width: 550px;
  width: 100%;
`;

export const ClaimBtn = styled.div`
  margin-top: 10px;

  button {
    padding: 10px 40px;
  }
`;
