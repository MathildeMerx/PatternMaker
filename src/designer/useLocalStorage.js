import { useState, useEffect, useLayoutEffect, useRef } from "react";

const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;

function useLocalStorage(storageName, initialState) {
    let [data, setData] = useState(initialState);

    const isFirstRender = useRef(true);

    useIsomorphicLayoutEffect(() => {
        const localStorageData = window.localStorage.getItem(storageName);

        if (
            localStorageData !== undefined &&
            localStorageData !== null &&
            isFirstRender.current
        ) {
            setData(JSON.parse(localStorageData));
        }

        isFirstRender.current = false;
    }, []);

    useEffect(() => {
        window.localStorage.setItem(storageName, JSON.stringify(data));
    }, [data, storageName]);

    return [data, setData];
}

export default useLocalStorage;
