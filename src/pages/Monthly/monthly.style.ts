import styled from "styled-components";

export const MonthlyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 20px;
`;

export const Title = styled.h2`
  text-transform: capitalize;
  margin-bottom: 0;
`;

export const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media only screen and (max-width: 800px) {
    gap: 20px;
  }
`;

export const TotalBudgetWrapper = styled.div`
  padding: 15px;
  border: 1px solid #000;
  width: 330px;
  border-radius: 10px;
  background: #fcfade;

  @media only screen and (max-width: 800px) {
    width: 90%;
  }

  > div {
    @media only screen and (max-width: 800px) {
      border: 0;
      padding: 0;
    }
  }
`;

export const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;

  @media only screen and (max-width: 800px) {
    justify-content: space-between;
  }
`;

export const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
