import styled from "styled-components";

export const HomeWrapper = styled.div`
  display: flex;
  gap: 40px;
  flex-direction: column;
`;

export const NoBudgetWrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;

  h2 {
    @media only screen and (max-width: 800px) {
      font-size: 18px;
    }
  }
`;

export const NoBudgetSection = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const SubmitBudget = styled.div`
  margin-top: 30px;
`;
