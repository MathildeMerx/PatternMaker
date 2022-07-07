import { useEffect, useRef, useState } from "react";

function useEffectCloseClickOutside(openComponentRef, setClicked) {
    //If the user clicks outside of the component, the log in menu closes
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                openComponentRef.current &&
                !openComponentRef.current.contains(event.target)
            ) {
                setClicked(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [openComponentRef, setClicked]);
}

function useCloseClickOutside() {
    //If the user has clicked on the icon, a menu to log in appears
    const [clicked, setClicked] = useState(false);
    const openComponentRef = useRef();
    useEffectCloseClickOutside(openComponentRef, setClicked);

    return [[clicked, setClicked], openComponentRef];
}

export default useCloseClickOutside;
export { useEffectCloseClickOutside };
