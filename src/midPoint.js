function midPoint(existingPoints, firstPoint, secondPoint) {
    const [firstAbscissa, firstOrdinate] = existingPoints[firstPoint];
    const [secondAbscissa, secondOrdinate] = existingPoints[secondPoint];

    const midAbscissa = (firstAbscissa + secondAbscissa) / 2;

    const midOrdinate = (firstOrdinate + secondOrdinate) / 2;

    return [midAbscissa, midOrdinate];
}

export { midPoint };
