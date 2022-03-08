import { alphabetObject } from "./alphabet";

function PatternPoint({ index, value, numCellHeight, gridSpacing, onClick }) {
    if (!value) {
        return (
            <button
                key={index}
                className="pattern-point"
                onClick={onClick}
                style={{
                    top: `${
                        (index % (numCellHeight - 1)) * gridSpacing + 42
                    }px`,
                    left: `${
                        Math.floor(index / (numCellHeight - 1)) * gridSpacing +
                        42
                    }px`,
                }}
            />
        );
    } else {
        return (
            <button
                key={index}
                className="pattern-point-existing"
                onClick={onClick}
                style={{
                    top: `${
                        (index % (numCellHeight - 1)) * gridSpacing + 42
                    }px`,
                    left: `${
                        Math.floor(index / (numCellHeight - 1)) * gridSpacing +
                        42
                    }px`,
                }}
            >
                {value}
            </button>
        );
    }
}

function createNewPoint(index, points, setPoints, pointNum, setPointNum) {
    let pointsCopy = points.slice();
    if (pointsCopy[index]) {
        pointsCopy[index] = "";
    } else {
        pointsCopy[index] = alphabetObject[pointNum];
        setPointNum(pointNum + 1);
    }
    setPoints(pointsCopy);
}

export { PatternPoint, createNewPoint };
