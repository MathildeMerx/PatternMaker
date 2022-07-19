import React from "react";
import { ThemeProvider } from "styled-components";
import Designer from "../src/designer/General/Designer";
import { theme } from "../src/Theme/theme";
import { createGlobalStyle } from "styled-components";

function Index() {
    return (
        <React.StrictMode>
            <GlobalStyle />
            <ThemeProvider theme={theme}>
                <Designer />
            </ThemeProvider>
        </React.StrictMode>
    );
}

export default Index;

const GlobalStyle = createGlobalStyle`
  * {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  }
`;
