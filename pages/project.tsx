import React from "react";
import { ThemeProvider } from "styled-components";
import ProjectPage from "../src/project/project";
import { theme } from "../src/Theme/theme";
import { createGlobalStyle } from "styled-components";

function Project() {
    return (
        <React.StrictMode>
            <GlobalStyle />
            <ThemeProvider theme={theme}>
                <ProjectPage />
            </ThemeProvider>
        </React.StrictMode>
    );
}

export default Project;

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
