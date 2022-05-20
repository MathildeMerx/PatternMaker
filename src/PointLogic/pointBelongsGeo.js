function PointBelongsSegment(segments, pointName, setAlertMessage) {
    // Checking whether this point belongs to a segment
    for (let seg in segments) {
        if (segments[seg][0] === pointName || segments[seg][1] === pointName) {
            // If the point belongs to a segment,
            // the point is not deleted and an alert message is generated
            setAlertMessage({
                alertType: "deletePointSegment",
                point: pointName,
                segment: segments[seg],
            });
            return true;
        }
    }
}

function PointBelongsCurve(curves, pointName, setAlertMessage) {
    // Checking whether this point belongs to a curve
    for (let curv in curves) {
        if (
            curves[curv].startPoint === pointName ||
            curves[curv].endPoint === pointName
        ) {
            // If the point belongs to a curve,
            // the point is not deleted and an alert message is generated
            setAlertMessage({
                alertType: "deletePointCurve",
                point: pointName,
                curve: curves[curv].slice(0, 2),
            });
            return true;
        }
    }
}

export { PointBelongsCurve, PointBelongsSegment };
