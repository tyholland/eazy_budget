import { Box } from "@mui/material";
import styled from "styled-components";

export const Wrapper = styled(Box)`
  min-width: 120px;

  @media only screen and (max-width: 800px) {
    min-width: 70px;
  }
`;
