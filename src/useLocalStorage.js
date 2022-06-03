import { useState, useEffect } from "react";

function useLocalStorage(storageName, initialState) {
    let [data, setData] = useState(
        () =>
            JSON.parse(window.localStorage.getItem(storageName)) ?? initialState
    );

    useEffect(() => {
        window.localStorage.setItem(storageName, JSON.stringify(data));
    }, [data, storageName]);

    return [data, setData];
}

export default useLocalStorage;
