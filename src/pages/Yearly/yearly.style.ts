import styled from "styled-components";

export const YearlylyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const Title = styled.h2`
  text-transform: capitalize;
`;

export const ItemWrapper = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  width: 750px;
  align-items: center;
  justify-content: space-between;

  @media only screen and (max-width: 800px) {
    width: 100%;
    gap: 20px;
  }

  > div {
    @media only screen and (max-width: 800px) {
      flex-direction: row;
      width: 100%;
      align-items: center;
      border: 0;
      padding: 0;
    }
  }
`;

export const TotalBudgetWrapper = styled.div`
  padding: 15px;
  border: 1px solid #000;
  width: 330px;
  border-radius: 10px;
  margin-top: 50px;
  background: #fcfade;

  @media only screen and (max-width: 800px) {
    margin-top: 20px;
    width: 90%;
  }

  input {
    @media only screen and (max-width: 800px) {
      font-size: 18px;
    }
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
  margin-bottom: 50px;

  @media only screen and (max-width: 800px) {
    margin-bottom: 20px;
  }
`;
