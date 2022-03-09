import { useState } from "react";
import { PatternPoint, createNewPoint } from "./PatternPoint";
import "./App.css";
import { pointNames } from "./alphabet";

function GridCell({
    numCellWidth,
    numCellHeight,
    numButton,
    points,
    setPoints,
    gridSpacing,
    segments,
}) {
    const [pointNum, setPointNum] = useState(pointNames);
    const arrWidth = [...Array(numCellWidth).keys()];
    const arrHeight = [...Array(numCellHeight).keys()];
    const arrButton = [...Array(numButton).keys()];
    const width = numCellWidth * gridSpacing;
    const height = numCellHeight * gridSpacing;

    return (
        <div
            className="design-grid"
            style={{
                width: `${numCellWidth * gridSpacing}px`,
                height: `${numCellHeight * gridSpacing}px`,
            }}
        >
            <svg
                width={width}
                height={height}
                viewBox={`0 0 ${width} ${height} `}
            >
                {segments.map((seg) => {
                    if (seg.length === 1) {
                        return null;
                    } else {
                        const origin = seg[0];
                        const dest = seg[1];
                        const originIndex = points.indexOf(origin);
                        const destIndex = points.indexOf(dest);
                        console.log(
                            (Math.floor(originIndex / (numCellHeight - 1)) +
                                1) *
                                50
                        );
                        console.log((originIndex % (numCellHeight - 1)) + 1);
                        return (
                            <path
                                d={`M ${
                                    (Math.floor(
                                        originIndex / (numCellHeight - 1)
                                    ) +
                                        1) *
                                    50
                                } ${
                                    ((originIndex % (numCellHeight - 1)) + 1) *
                                    50
                                } L ${
                                    (Math.floor(
                                        destIndex / (numCellHeight - 1)
                                    ) +
                                        1) *
                                    50
                                } ${
                                    ((destIndex % (numCellHeight - 1)) + 1) * 50
                                }`}
                                fill="none"
                                stroke="red"
                                strokeWidth="2"
                            />
                        );
                    }
                })}
            </svg>
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
