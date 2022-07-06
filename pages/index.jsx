import React from "react";
import { ThemeProvider } from "styled-components";
import App from "../src/App";
import { theme } from "../src/Theme/theme";

function Index() {
    return (
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </React.StrictMode>
    );
}

export default Index;
