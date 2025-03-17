import styled from "styled-components";

export const PredictWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  gap: 40px;
  flex-direction: column;
  margin-bottom: 40px;

  @media only screen and (max-width: 800px) {
    gap: 20px;
    margin-bottom: 20px;
  }
`;

export const PredictInputs = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;
`;

export const PredictBudgets = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: space-between;

  @media only screen and (max-width: 800px) {
    flex-wrap: nowrap;
    flex-direction: column;
  }
`;
