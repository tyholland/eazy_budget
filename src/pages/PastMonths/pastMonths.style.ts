import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
  margin: 30px 0;

  @media only screen and (max-width: 800px) {
    gap: 30px;
    justify-content: center;
  }
`;

export const NoHistory = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin: 30px auto 0;

  @media only screen and (max-width: 800px) {
    flex-direction: column;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 8px;

    @media only screen and (max-width: 800px) {
      margin-top: 30px;
    }
  }
`;
