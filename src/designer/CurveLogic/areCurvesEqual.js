//Testing whether two arrays are identical
function areCurvesEqual(curve1, curve2) {
    if (
        curve1.startPoint !== curve2.startPoint &&
        curve1.startPoint !== curve2.endPoint
    ) {
        return false;
    }
    if (
        curve1.endPoint !== curve2.startPoint &&
        curve1.endPoint !== curve2.endPoint
    ) {
        return false;
    }
    if (curve1.controlPoint[0] !== curve2.controlPoint[0]) {
        return false;
    }
    if (curve1.controlPoint[1] !== curve2.controlPoint[1]) {
        return false;
    }
    return true;
}

export default areCurvesEqual;
