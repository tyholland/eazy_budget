import styled from "styled-components";

export const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media only screen and (max-width: 800px) {
    align-items: flex-start;
    flex-direction: column;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 15px 20px;
  }

  .tooltip {
    width: 130px;
    text-align: center;
  }
`;

export const Item = styled.div`
  display: flex;
  gap: 16px;

  > div {
    flex-direction: row;
  }

  @media only screen and (max-width: 800px) {
    width: 100%;
    flex-direction: column;
  }
`;

export const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
