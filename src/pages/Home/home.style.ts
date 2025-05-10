import styled from "styled-components";

export const HomeWrapper = styled.div`
  display: flex;
  gap: 40px;
  flex-direction: column;
`;

export const SubmitBudget = styled.div`
  margin: 0 auto;

  @media only screen and (max-width: 800px) {
    width: 100%;
  }
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 18px;
  gap: 10px;
  width: 660px;
  margin: 0 auto;
  font-weight: 500;

  @media only screen and (max-width: 800px) {
    width: 100%;
  }

  .capital {
    text-transform: capitalize;
  }
`;

export const BudgetSection = styled.div`
  display: flex;
  gap: 60px;
  justify-content: center;

  > div {
    width: 400px;

    @media only screen and (max-width: 800px) {
      width: 100%;
    }
  }

  img {
    @media only screen and (max-width: 800px) {
      display: none;
    }
  }
`;
