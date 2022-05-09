import { availablePointNames } from "./availablePointNames";

//We retrieve the latest saved pattern
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
            //If the call is successful, we retrieve the latest save
            const data = json.slice(0).sort(function (x, y) {
                return y.id - x.id;
            })["0"];

            //The right data is assigned to the right variables
            setPoints(JSON.parse(JSON.stringify(data["points"])));
            setSegments(JSON.parse(JSON.stringify(data["segments"])) ?? []);
            setCurves(JSON.parse(JSON.stringify(data["curves"])) ?? {});

            //We deduce the available point names based on the existing points
            setPossiblePointNames(
                availablePointNames(JSON.parse(JSON.stringify(data["points"])))
            );

            //We retrieve the name of the pattern
            setPieceName(JSON.parse(JSON.stringify(data["description"])));

            //We specify the retrieving worked
            setRetrieveAlert(
                `"${JSON.parse(
                    JSON.stringify(data["description"])
                )}" successfully retrieved!`
            );
        })
        //If there is an error, an alert message will be displayed
        .catch(() => setRetrieveAlert("Warning: retrieve failed."));
}

export { retrieve };
