import { pointNames } from "../alphabet";

//Returns point names which aren't used yet - used when retrieving
//a pattern form the database
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
