import { pointNames } from "./alphabet";

function availablePointNames(points) {
    let existingPoints = Object.keys(points);

    let potentialPointNames = [];
    for (let index in pointNames) {
        if (!existingPoints.includes(pointNames[index])) {
            potentialPointNames.push(pointNames[index]);
        }
    }

    return potentialPointNames;
}

export { availablePointNames };
