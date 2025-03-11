import styled from "styled-components";

export const HeaderWrapper = styled.div`
  display: flex;
  padding-bottom: 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid #333;
`;

export const Title = styled.div`
  font-family: "Comic Neue", cursive;
  font-style: italic;
  font-size: 40px;
  font-weight: 700;

  @media only screen and (max-width: 600px) {
    font-size: 30px;
  }
`;
