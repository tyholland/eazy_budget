import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0 auto;
    width: 800px;
    font-family:
      -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu",
      "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    @media only screen and (max-width: 800px) {
      width: 90%;
      padding: 0 5% 10%;
    }
  }

  code {
    font-family:
      source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
  }
`;
