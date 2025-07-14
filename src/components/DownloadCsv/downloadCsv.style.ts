import styled from "styled-components";
import { BLACK, LIGHT_SKY_BLUE, SKY_BLUE } from "../../index.style.ts";
import CsvDownloadButton from "react-json-to-csv";

export const BtnWrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;

  @media only screen and (max-width: 800px) {
    gap: 20px;
  }
`;

export const CsvBtn = styled(CsvDownloadButton)`
  text-transform: capitalize;
  border-radius: 30px;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
  background: ${LIGHT_SKY_BLUE};
  color: ${BLACK};
  width: 150px;
  height: 150px;
  font-size: 20px;

  @media only screen and (max-width: 800px) {
    width: 100%;
  }

  &:hover {
    background: ${SKY_BLUE};
  }
`;
