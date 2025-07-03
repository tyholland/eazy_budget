import styled from "styled-components";
import { BLACK } from "../../index.style.ts";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 75px;

  @media only screen and (max-width: 800px) {
    margin-bottom: 20px;
  }

  hr {
    background: ${BLACK};
    height: 1px;
    width: 100%;
    border: none;
  }
`;

export const Links = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;

  a.text {
    color: ${BLACK};
  }
`;

export const Copyright = styled.div`
  text-align: center;
`;
