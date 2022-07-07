function samePlacePoint(
    point: [number, number],
    pointsList: { string: [number, number] }
): boolean {
    for (let coordinates of Object.values(pointsList)) {
        if (point[0] === coordinates[0] && point[1] === coordinates[1]) {
            return true;
        }
    }
    return false;
}

export default samePlacePoint;
