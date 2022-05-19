import { useEffect, useState, useRef } from "react";

//Custom hook returning the dimensions and reference of the referenced component
function useContainerDimensions() {
    const containerRef = useRef();

    //The dimensions are initialized with the following values
    const [dimensions, setDimensions] = useState({ width: 600, height: 600 });

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
