import styled from "styled-components";

export const YearlylyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  gap: 30px;

  .tooltip {
    width: 150px;
  }
`;

export const Title = styled.h2`
  text-transform: capitalize;
  margin-bottom: 0;
`;

export const ItemWrapper = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  width: 750px;
  align-items: center;
  justify-content: space-between;
  height: 300px;
  flex-direction: column;

  @media only screen and (max-width: 800px) {
    width: 100%;
    gap: 20px;
    height: auto;
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
  background: #fcfade;

  @media only screen and (max-width: 800px) {
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
`;
