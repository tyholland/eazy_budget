import styled from "styled-components";
import { RUBIK } from "../../index.style.ts";

export const Wrapper = styled.div`
  display: flex;
  gap: 50px;
  flex-direction: column;
`;

export const Section = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;

  a {
    @media only screen and (max-width: 800px) {
      width: 80% !important;
      font-size: 18px;
    }
  }
`;

export const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 18px;
  align-items: center;
  margin: 0 auto;

  h2 {
    font-family: ${RUBIK};
  }

  span {
    max-width: 600px;
    width: 100%;

    @media only screen and (max-width: 800px) {
      text-align: center;
    }
  }
`;

export const SelectionWrapper = styled.div`
  display: flex;
  gap: 50px;
  align-items: center;
  justify-content: center;

  img {
    @media only screen and (max-width: 800px) {
      display: none;
    }
  }
`;

export const SectionWrapper = styled.div`
  display: flex;
  gap: 25px;
  flex-direction: column;

  @media only screen and (max-width: 800px) {
    width: 100%;
  }
`;

export const ChangeOption = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const OrLine = styled.div`
  display: flex;
  align-items: center;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  gap: 10px;
  margin-bottom: 20px;

  @media only screen and (max-width: 800px) {
    margin-bottom: 40px;
  }

  hr {
    width: 100%;
    margin: 5px 0 0 0;
  }
`;

export const UploadWrapper = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  justify-content: end;

  @media only screen and (max-width: 800px) {
    flex-direction: column;
    gap: 40px;
  }
`;

export const UploadSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const UploadContent = styled.span`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;
