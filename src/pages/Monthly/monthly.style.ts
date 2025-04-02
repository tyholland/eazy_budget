import styled from "styled-components";

export const MonthlyWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin: 20px 0;
`;

export const Title = styled.h2`
  text-transform: capitalize;
  margin: 0;
`;

export const ItemContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;

  input:not(:disabled) {
    width: 120px !important;
  }
`;

export const ItemWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
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

export const ContentWrapper = styled.div`
  width: 85%;
  display: flex;
  gap: 20px;
  flex-direction: column;
`;
