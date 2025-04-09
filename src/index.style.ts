import { createGlobalStyle } from "styled-components";

// Fonts
export const COSMIC = '"Comic Neue", cursive'; // Site title
export const RUBIK = '"Rubik", sans-serif'; // Headers/Page titles
export const BARLOW = '"Barlow", sans-serif;'; // Content

// Colors
export const WHITE = "#ffffff";
export const OFF_WHITE = "#f2f0ef";
export const BLACK = "#000000";
export const DARK_GRAY = "#555555";
export const DARKER_GRAY = "#333333";
export const LIGHT_GRAY = "#dddddd";
export const LIGHTER_GRAY = "#eeeeee";
export const GRAY = "#999999";
export const RED = "#ff0000";
export const LIGHT_RED = "#ffcccb";
export const GREEN = "#00ff00";
export const LIGHT_GREEN = "#cefad0";
export const SKY_BLUE = "#57b9ff";
export const LIGHT_SKY_BLUE = "#90d5ff";
export const LIGHT_YELLOW = "#fcfade";

// Globals
export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0 auto 5%;
    max-width: 1200px;
    min-width: 800px;
    width: 90%;
    font-family: ${BARLOW};
    background: ${OFF_WHITE};

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
