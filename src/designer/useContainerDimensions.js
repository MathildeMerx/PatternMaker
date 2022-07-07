import { useEffect, useState, useRef } from "react";
import { MIN_WNDOW_HEIGHT, MIN_WNDOW_WIDTH } from "../Theme/constants";

//Custom hook returning the dimensions and reference of the referenced component
function useContainerDimensions() {
    const containerRef = useRef();

    //The dimensions are initialized with the following values
    const [dimensions, setDimensions] = useState({
        width: MIN_WNDOW_WIDTH,
        height: MIN_WNDOW_HEIGHT,
    });

    //When the window is resized, the dimensions are updated
    useEffect(() => {
        function getDimension() {
            setDimensions({
                width: containerRef.current.offsetWidth,
                height: containerRef.current.offsetHeight,
            });
        }

        getDimension();

        window.addEventListener("resize", getDimension);
        return () => window.removeEventListener("resize", getDimension);
    }, []);

    return [dimensions, containerRef];
}

export default useContainerDimensions;
