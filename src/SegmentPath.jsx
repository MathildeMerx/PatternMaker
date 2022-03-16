function SegmentPath({ segment, existingPoints }) {
    const origin = segment[0];
    const dest = segment[1];

    const origineAbscisse = existingPoints[origin][0];
    const origineOrdonnee = existingPoints[origin][1];
    const destinationAbscisse = existingPoints[dest][0];
    const destinationOrdonnee = existingPoints[dest][1];

    return (
        <path
            d={`M ${origineAbscisse * 50} ${origineOrdonnee * 50} 
            L ${destinationAbscisse * 50} ${destinationOrdonnee * 50}`}
            fill="none"
            stroke="red"
            strokeWidth="2"
        />
    );
}

export { SegmentPath };
