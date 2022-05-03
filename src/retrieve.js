import { availablePointNames } from "./availablePointNames";

function retrieve(
    setPoints,
    setSegments,
    setCurves,
    setPossiblePointNames,
    setPieceName,
    setRetrieveAlert,
    credentials
) {
    let headers = new Headers();
    let username = credentials[0];
    let password = credentials[1];
    headers.set("Authorization", "Basic " + btoa(username + ":" + password));
    let url = "https://sewpat.tsango.com/api/patterns/4/drawings/";
    fetch(url, { method: "GET", headers: headers })
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            const data = json.slice(0).sort(function (x, y) {
                return y.id - x.id;
            })["0"];
            setPoints(JSON.parse(JSON.stringify(data["points"])));
            setSegments(JSON.parse(JSON.stringify(data["segments"])) ?? []);
            setCurves(JSON.parse(JSON.stringify(data["curves"])) ?? {});
            setPossiblePointNames(
                availablePointNames(JSON.parse(JSON.stringify(data["points"])))
            );
            setPieceName(JSON.parse(JSON.stringify(data["description"])));
            setRetrieveAlert(
                `"${JSON.parse(
                    JSON.stringify(data["description"])
                )}" successfully retrieved!`
            );
        })
        .catch(() => setRetrieveAlert("Warning: retrieve failed."));
}

export { retrieve };
