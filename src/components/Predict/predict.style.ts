import styled from "styled-components";

export const PredictWrapper = styled.div`
  display: flex;
  gap: 40px;
  flex-direction: column;

  @media only screen and (max-width: 800px) {
    gap: 20px;
  }
`;

export const PredictInputs = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;

  label {
    @media only screen and (max-width: 800px) {
      text-align: left;
    }
  }

  input {
    @media only screen and (max-width: 800px) {
      width: 130px;
    }
  }
`;

export const PredictBudgets = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;

  span {
    font-weight: 700;
  }
`;

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 18px;
  width: 100%;
`;
