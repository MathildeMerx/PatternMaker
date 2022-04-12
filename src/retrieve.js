import { availablePointNames } from "./availablePointNames";

function retrieve(
    points,
    setPoints,
    setSegments,
    setCurves,
    setPossiblePointNames
) {
    let headers = new Headers();
    let username = "mmerx";
    let password = "Y60yWAfF0qX6Uk8N";
    headers.set("Authorization", "Basic " + btoa(username + ":" + password));
    let url = "https://sewpat.tsango.com/api/patterns/4/drawings/";
    fetch(url, { method: "GET", headers: headers })
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            setPoints(JSON.parse(JSON.stringify(json[0]["points"])));
            setSegments(JSON.parse(JSON.stringify(json[0]["segments"])) ?? []);
            setCurves(JSON.parse(JSON.stringify(json[0]["curves"])) ?? {});
            setPossiblePointNames(
                availablePointNames(
                    JSON.parse(JSON.stringify(json[0]["points"]))
                )
            );
        });
}

export { retrieve };
