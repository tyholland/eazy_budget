import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 30px;
  justify-content: center;

  @media only screen and (max-width: 800px) {
    flex-direction: column;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 15px;

    @media only screen and (max-width: 800px) {
      margin-top: 30px;
    }
  }
`;
