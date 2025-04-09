import styled from "styled-components";

export const GraphWraper = styled.div`
  width: 500px;
  min-height: 500px;
  max-height: 1000px;
  height: 100%;
  margin: 0 auto;

  @media only screen and (max-width: 800px) {
    width: 100%;
  }
`;

export const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;

  @media only screen and (max-width: 800px) {
    justify-content: space-between;
  }
`;
