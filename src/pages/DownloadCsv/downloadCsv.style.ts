import styled from "styled-components";
import { BLACK, LIGHT_SKY_BLUE, RUBIK, SKY_BLUE } from "../../index.style.ts";
import CsvDownloadButton from "react-json-to-csv";

export const Title = styled.div`
  font-size: 30px;
  font-weight: 700;
  font-family: ${RUBIK};
  margin-bottom: 30px;
`;

export const BtnWrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
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
  width: 300px;

  &:hover {
    background: ${SKY_BLUE};
  }
`;
