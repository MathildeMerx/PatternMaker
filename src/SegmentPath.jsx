function SegmentPath({ segment, existingPoints, cellWidth, cellHeight }) {
    const startPoint = segment[0];
    const endPoint = segment[1];

    const startAbscissa = existingPoints[startPoint][0] * cellWidth;
    const startOrdinate = existingPoints[startPoint][1] * cellHeight;
    const endAbscissa = existingPoints[endPoint][0] * cellWidth;
    const endOrdinate = existingPoints[endPoint][1] * cellHeight;

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
