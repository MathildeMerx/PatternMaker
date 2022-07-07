import AppWorking from "./AppWorking";
import AppNotWorking from "./AppNotWorking";
import useWindowDimensions from "./useWindowDimensions";
import { createGlobalStyle } from "styled-components";
import { MIN_WNDOW_HEIGHT, MIN_WNDOW_WIDTH } from "./Theme/constants";

function App() {
    let { width, height } = useWindowDimensions();
    return (
        <>
            <GlobalStyle />
            {width >= MIN_WNDOW_WIDTH && height >= MIN_WNDOW_HEIGHT ? (
                <AppWorking />
            ) : (
                <AppNotWorking width={width} height={height} />
            )}
        </>
    );
}

export default App;

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
