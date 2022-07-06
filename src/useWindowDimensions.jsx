import { useEffect, useLayoutEffect, useState } from "react";
import { MIN_WNDOW_HEIGHT, MIN_WNDOW_WIDTH } from "Theme/constants";

function useWindowDimensions() {
    function getWindowDimension() {
        return { width: window.innerWidth, height: window.innerHeight };
    }

    const [windowDimensions, setWindowDimensions] = useState({
        width: MIN_WNDOW_WIDTH,
        height: MIN_WNDOW_HEIGHT,
    });

    useLayoutEffect(() => {
        setWindowDimensions(getWindowDimension());
    }, []);

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimension());
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowDimensions;
}

export default useWindowDimensions;
