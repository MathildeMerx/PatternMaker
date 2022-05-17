import AppWorking from "./AppWorking";
import AppNotWorking from "./AppNotWorking";
import useWindowDimensions from "./useWindowDimensions";
import { MIN_WNDOW_HEIGHT, MIN_WNDOW_WIDTH } from "./Theme/constants";

function App() {
    let { width, height } = useWindowDimensions();
    if (width >= MIN_WNDOW_WIDTH && height >= MIN_WNDOW_HEIGHT) {
        return <AppWorking />;
    } else {
        return <AppNotWorking width={width} height={height} />;
    }
}

export default App;
