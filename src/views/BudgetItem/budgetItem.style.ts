import styled from "styled-components";

export const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media only screen and (max-width: 800px) {
    align-items: flex-start;
    flex-direction: column;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 10px;
  }

  .tooltip {
    width: 130px;
    text-align: center;
  }
`;

export const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
