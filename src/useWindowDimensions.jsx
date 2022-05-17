import { useEffect, useState } from "react";

function useWindowDimensions() {
    function getWindowDimension() {
        return { width: window.innerWidth, height: window.innerHeight };
    }

    const [windowDimensions, setWindowDimensions] = useState(() =>
        getWindowDimension()
    );

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
