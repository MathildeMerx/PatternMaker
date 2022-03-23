function SegmentPath({ segment, existingPoints, gridSpacing }) {
    const startPoint = segment[0];
    const endPoint = segment[1];

    const startAbscissa = existingPoints[startPoint][0] * gridSpacing;
    const startOrdinate = existingPoints[startPoint][1] * gridSpacing;
    const endAbscissa = existingPoints[endPoint][0] * gridSpacing;
    const endOrdinate = existingPoints[endPoint][1] * gridSpacing;

    return (
        <path
            d={`M ${startAbscissa} ${startOrdinate} 
            L ${endAbscissa} ${endOrdinate}`}
            fill="none"
            stroke="red"
            strokeWidth="2"
        />
    );
}

export { SegmentPath };
