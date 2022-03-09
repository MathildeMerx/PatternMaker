function PatternPoint({ index, value, numCellHeight, gridSpacing, onClick }) {
    const distFromTop = (index % (numCellHeight - 1)) * gridSpacing + 42;
    const distFromLeft =
        Math.floor(index / (numCellHeight - 1)) * gridSpacing + 42;
    return (
        <button
            key={index}
            className={
                value ? "pattern-point pattern-point-existing" : "pattern-point"
            }
            onClick={onClick}
            style={{
                top: `${distFromTop}px`,
                left: `${distFromLeft}px`,
            }}
        >
            {value}
        </button>
    );
}

function createNewPoint(index, points, setPoints, pointNum, setPointNum) {
    let pointsCopy = points.slice();
    let pointNumCopy = pointNum.slice();
    if (pointsCopy[index]) {
        pointNumCopy.push(pointsCopy[index]);
        pointNumCopy.sort().reverse();
        pointsCopy[index] = "";
    } else {
        pointsCopy[index] = pointNumCopy.pop();
    }
    setPoints(pointsCopy);
    setPointNum(pointNumCopy);
}

export { PatternPoint, createNewPoint };
