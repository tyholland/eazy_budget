import styled from "styled-components";

export const OverviewWrapper = styled.div`
  display: flex;
  gap: 12px;
  flex-direction: column;

  @media only screen and (max-width: 800px) {
    gap: 25px;
    border: 1px solid #ddd;
    padding: 20px 10px;
    border-radius: 10px;
  }

  .tooltip {
    width: 150px;
  }

  .override {
    flex-direction: row;
    align-items: center;
  }
`;

export const Title = styled.h2`
  border-bottom: 1px solid #000;

  @media only screen and (max-width: 800px) {
    margin: 0;
  }
`;

export const Section = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media only screen and (max-width: 800px) {
    flex-direction: row-reverse;
    align-items: flex-start;
    justify-content: flex-end;
  }
`;
