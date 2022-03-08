import { useState } from "react";
import { PatternPoint, createNewPoint } from "./PatternPoint";
import "./App.css";
import { alphabet } from "./alphabet";

function GridCell({ parentWidth, parentHeight }) {
    const gridSpacing = 50;

    const numCellWidth = Math.floor((parentWidth - 32) / gridSpacing);
    const arrWidth = [...Array(numCellWidth).keys()];

    const numCellHeight = Math.floor((parentHeight - 80) / gridSpacing) - 1;
    const arrHeight = [...Array(numCellHeight).keys()];

    const numButton = (numCellHeight - 1) * (numCellWidth - 1);
    const arrButton = [...Array(numButton).keys()];

    const [points, setPoints] = useState(Array(numButton).fill(""));
    const [pointNum, setPointNum] = useState(alphabet);

    return (
        <div
            className="design-grid"
            style={{
                width: `${numCellWidth * gridSpacing}px`,
                height: `${numCellHeight * gridSpacing}px`,
            }}
        >
            {arrWidth.map((line) => (
                <div
                    key={line}
                    className="column"
                    style={{ left: `${(line + 1) * gridSpacing}px` }}
                />
            ))}
            {arrHeight.map((line) => (
                <div
                    key={line}
                    className="row"
                    style={{ top: `${(line + 1) * gridSpacing}px` }}
                />
            ))}
            {arrButton.map((index) => (
                <PatternPoint
                    index={index}
                    key={index}
                    value={points[index]}
                    numCellHeight={numCellHeight}
                    gridSpacing={gridSpacing}
                    onClick={() =>
                        createNewPoint(
                            index,
                            points,
                            setPoints,
                            pointNum,
                            setPointNum
                        )
                    }
                />
            ))}
        </div>
    );
}

export { GridCell };
