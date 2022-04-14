import { v4 as uuidv4 } from "uuid";

function save(points, segments, curves, pieceName) {
    let headers = new Headers();
    let username = "mmerx";
    let password = "Y60yWAfF0qX6Uk8N";
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
    }).then((response) => response.json());
}

export { save };
