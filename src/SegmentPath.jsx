function SegmentPath({ segment, existingPoints }) {
    const startPoint = segment[0];
    const endPoint = segment[1];

    const startAbscissa = existingPoints[startPoint][0] * 50;
    const startOrdinate = existingPoints[startPoint][1] * 50;
    const endAbscissa = existingPoints[endPoint][0] * 50;
    const endOrdinate = existingPoints[endPoint][1] * 50;

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
