import DesignerWorking from "./DesignerWorking";
import DesignerNotWorking from "./DesignerNotWorking";
import useWindowDimensions from "./useWindowDimensions";
import { MIN_WNDOW_HEIGHT, MIN_WNDOW_WIDTH } from "../Theme/constants";

function Designer() {
    let { width, height } = useWindowDimensions();
    return width >= MIN_WNDOW_WIDTH && height >= MIN_WNDOW_HEIGHT ? (
        <DesignerWorking />
    ) : (
        <DesignerNotWorking width={width} height={height} />
    );
}

export default Designer;
