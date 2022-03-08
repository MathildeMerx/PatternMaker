import { useEffect, useState, useRef } from "react";

function useContainerDimensions() {
    const containerRef = useRef();

    const [dimensions, setDimensions] = useState({ width: 600, height: 600 });

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

export { useContainerDimensions };