import { useState, useEffect, useLayoutEffect } from "react";

function useLocalStorage(storageName, initialState) {
    let [data, setData] = useState(initialState);

    useLayoutEffect(() => {
        setData(
            JSON.parse(window.localStorage.getItem(storageName)) ?? initialState
        );
    }, []);

    useEffect(() => {
        window.localStorage.setItem(storageName, JSON.stringify(data));
    }, [data, storageName]);

    return [data, setData];
}

export default useLocalStorage;
