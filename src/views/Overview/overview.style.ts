import styled from "styled-components";

export const OverviewWrapper = styled.div`
  display: flex;
  gap: 12px;
  flex-direction: column;

  @media only screen and (max-width: 800px) {
    gap: 18px;
    border: 1px solid #ddd;
    padding: 20px 10px;
    border-radius: 10px;
  }
`;

export const Title = styled.h2`
  border-bottom: 1px solid #000;

  @media only screen and (max-width: 800px) {
    margin-top: 0;
  }
`;

export const Prediction = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 700;

  @media only screen and (max-width: 800px) {
    flex-direction: column;
    align-items: flex-start;
  }

  a {
    @media only screen and (max-width: 800px) {
      width: 90% !important;
    }
  }
`;

export const Section = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
