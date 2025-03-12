import styled from "styled-components";

export const Title = styled.h2`
  text-transform: capitalize;

  @media only screen and (max-width: 800px) {
    font-size: 18px;
  }
`;

export const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const BtnWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  @media only screen and (max-width: 800px) {
    flex-direction: column;
  }
`;
