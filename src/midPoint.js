function midPoint(existingPoints, firstPoint, secondPoint) {
    if (firstPoint === null || secondPoint === null) {
        return [null, null];
    }
    const [firstAbscissa, firstOrdinate] = existingPoints[firstPoint];
    const [secondAbscissa, secondOrdinate] = existingPoints[secondPoint];

    const midAbscissa = (firstAbscissa + secondAbscissa) / 2;

    const midOrdinate = (firstOrdinate + secondOrdinate) / 2;

    return [midAbscissa, midOrdinate];
}

export { midPoint };
