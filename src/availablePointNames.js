import { pointNames } from "./alphabet";

function availablePointNames(points) {
    console.log(points);
    let existingPoints = Object.keys(points);
    console.log(existingPoints);

    let potentialPointNames = [];
    for (let index in pointNames) {
        if (!existingPoints.includes(pointNames[index])) {
            potentialPointNames.push(pointNames[index]);
        }
    }

    console.log(potentialPointNames);

    return potentialPointNames;
}

export { availablePointNames };
