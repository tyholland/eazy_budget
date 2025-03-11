import styled from "styled-components";

export const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media only screen and (max-width: 600px) {
    align-items: flex-start;
  }
`;

export const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
