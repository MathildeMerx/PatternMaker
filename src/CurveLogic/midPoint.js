//If both end points are filled in, this function will return the middle point
//Else, it returns a null point
function midPoint(points, firstPoint, secondPoint) {
    if (firstPoint === null || secondPoint === null) {
        return [null, null];
    }
    const [firstAbscissa, firstOrdinate] = points[firstPoint];
    const [secondAbscissa, secondOrdinate] = points[secondPoint];

    const midAbscissa = (firstAbscissa + secondAbscissa) / 2;

    const midOrdinate = (firstOrdinate + secondOrdinate) / 2;

    return [midAbscissa, midOrdinate];
}

export { midPoint };
