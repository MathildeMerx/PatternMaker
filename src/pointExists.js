function pointExists(x, y, listOfPoints) {
    let res = null;
    let point;
    for (point in listOfPoints) {
        if (listOfPoints[point][0] === x && listOfPoints[point][1] === y) {
            res = point;
        }
    }
    return res;
}

export { pointExists };
