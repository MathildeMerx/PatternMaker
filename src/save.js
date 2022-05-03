import { v4 as uuidv4 } from "uuid";

function save(points, segments, curves, pieceName, setSaveAlert, credentials) {
    let headers = new Headers();
    let username = credentials[0];
    let password = credentials[1];
    headers.set("Authorization", "Basic " + btoa(username + ":" + password));
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");
    let url = "https://sewpat.tsango.com/api/patterns/4/drawings/";

    let data = {
        name: uuidv4(),
        description: pieceName,
        points: points,
        segments: segments,
        curves: curves,
    };

    fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((json) => {
            json.description
                ? setSaveAlert(
                      `You have successfully saved ${json.description}!`
                  )
                : setSaveAlert("Warning: unsuccessful save...");
        });
}

export { save };
