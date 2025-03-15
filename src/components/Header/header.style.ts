import styled from "styled-components";

export const HeaderWrapper = styled.div`
  display: flex;
  padding-bottom: 10px;
  margin: 10px 0 20px;
  border-bottom: 1px solid #333;
  justify-content: space-between;
  align-items: flex-end;
`;

export const Title = styled.div`
  font-family: "Comic Neue", cursive;
  font-style: italic;
  font-size: 40px;
  font-weight: 700;

  @media only screen and (max-width: 800px) {
    font-size: 30px;
  }
`;
