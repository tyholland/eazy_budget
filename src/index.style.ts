import { createGlobalStyle } from "styled-components";

// Fonts
export const COSMIC = '"Comic Neue", cursive'; // Site title
export const RUBIK = '"Rubik", sans-serif'; // Headers/Page titles
export const BARLOW = '"Barlow", sans-serif;'; // Content

// Colors
export const WHITE = "#ffffff";
export const OFF_WHITE = "#FFFAF1";
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
export const EARTH_GREEN = "#5a8b5d";
export const ERROR_RED = "#ef5350";

// Globals
export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0 auto;
    max-width: 1200px;
    min-width: 800px;
    width: 92%;
    font-family: ${BARLOW};
    background: ${EARTH_GREEN};
    font-weight: 300;
    box-shadow: 0 0 10px ${OFF_WHITE};
    min-height: 100vh;
    max-height: fit-content;
    height: auto;

    @media only screen and (max-width: 800px) {
      padding: 0 2%;
      min-width: unset;
      max-width: unset;
      background: ${OFF_WHITE};
      box-shadow: none;
      width: 96%;
    }

    input, button {
      font-family: ${BARLOW};
    }

    #root {
      background: ${OFF_WHITE};
      padding: 0 2% 3%;

      @media only screen and (max-width: 800px) {
        padding: 0;
      }
    }

    main {
      min-height: 100vh;
      max-height: fit-content;
      height: auto;
      position: relative;
      padding-bottom: 140px;

      @media only screen and (max-width: 800px) {
        padding-bottom: 115px;
      }
    }
  }

  code {
    font-family:
      source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
  }

  .MuiModal-root {
    > .MuiBox-root {
      @media only screen and (max-width: 800px) {
        width: 90%;
        padding: 10% 5%;
      }

      .btnWrapper {
        @media only screen and (max-width: 800px) {
          flex-direction: column;
        }

        button {
          @media only screen and (max-width: 800px) {
            width: 80%;
            font-size: 18px;
          }
        }
      }
    }
  }
`;
