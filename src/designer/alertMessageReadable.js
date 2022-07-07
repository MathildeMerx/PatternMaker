function alertMessageReadable({ alertType, ...rest }) {
    if (alertType === "") {
        return "";
    }

    if (alertType.includes("Curve")) {
        switch (alertType) {
            case "existingCurve":
                return "A perfectly similar curve already exists!";
            case "nullCurve":
                return "Fill in a value for both ends of the curve!";
            case "uniquePointCurve":
                return "The start and end points should be different!";
            case "deletePointCurve":
                return `Point ${rest.point} belongs to curve (${rest.curve}), delete this
        curve first!`;
            default:
                throw new Error(
                    `Unexpected curve alert (${alertType}) in 'alertMessageRedeable'`
                );
        }
    }

    if (alertType.includes("Segment")) {
        switch (alertType) {
            case "existingSegment":
                return "A perfectly similar segment already exists!";
            case "nullSegment":
                return "Fill in a value for both ends of the segment!";
            case "uniquePointSegment":
                return "The start and end points should be different!";
            case "deletePointSegment":
                return `Point ${rest.point} belongs to curve [${rest.segment}], delete this
        segment first!`;
            default:
                throw new Error(
                    `Unexpected segment alert (${alertType}) in 'alertMessageRedeable'`
                );
        }
    } else {
        throw new Error("Unexpected alert in `alertMessageRedeable`");
    }
}

export default alertMessageReadable;
