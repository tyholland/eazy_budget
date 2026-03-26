import styled from "styled-components";
import { BLACK, LIGHT_GRAY, WHITE } from "../../index.style.ts";

export const CardWrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  margin-top: 20px;
`;

export const Card = styled.div`
  background: ${WHITE};
  box-shadow: -5px 5px 5px ${LIGHT_GRAY};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 25%;
  padding: 2%;

  strong {
    font-weight: 700;
  }

  div {
    overflow-wrap: break-word;
  }
`;

export const Select = styled.select`
  padding: 5px;
  border-radius: 5px;
`;

export const Input = styled.input`
  padding: 5px;
  border-radius: 5px;
  border: 1px solid ${BLACK};
`;

export const SearchWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

export const Button = styled.button`
  padding: 5px;
  border-radius: 5px;
  border: 1px solid ${BLACK};
`;
