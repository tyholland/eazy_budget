import styled from "styled-components";
import { BLACK } from "../../index.style.ts";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 146px;

  @media only screen and (max-width: 800px) {
    margin-bottom: 10px;
    height: 150px;
  }

  hr {
    background: ${BLACK};
    height: 0;
    width: 100%;
    border: 1px solid ${BLACK};
  }
`;

export const Links = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;

  @media only screen and (max-width: 800px) {
    flex-wrap: wrap;
    gap: 20px;
    line-height: 6px;
    margin-bottom: 10px;
  }

  a.text {
    color: ${BLACK};
  }
`;

export const Copyright = styled.div`
  text-align: center;
`;
