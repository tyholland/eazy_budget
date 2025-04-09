import { createGlobalStyle } from "styled-components";

// Fonts
export const COSMIC = '"Comic Neue", cursive'; // Site title
export const RUBIK = '"Rubik", sans-serif'; // Headers/Page titles
export const BARLOW = '"Barlow", sans-serif;'; // Content

// Colors
export const WHITE = "#ffffff";
export const BLACK = "#000000";
export const DARK_GRAY = "#333333";
export const GRAY = "#999999";

// Globals
export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0 auto 5%;
    max-width: 1200px;
    min-width: 800px;
    width: 90%;
    font-family: ${BARLOW};

    @media only screen and (max-width: 800px) {
      padding: 0 5%;
      min-width: auto;
      max-width: none;
    }

    input, button {
      font-family: ${BARLOW};
    }
  }

  code {
    font-family:
      source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
  }
`;
